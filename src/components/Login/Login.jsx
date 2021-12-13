import React, { useEffect, useState } from "react";
import "./login.css";
import useForm from "../useForm/useForm";
import useAPI from "../useAPI/useAPI";
import useAuth from "../../components/useAuth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Spinner, ToastContainer } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { defaultPostRequest as loginUser } from "../../static/main";

const Login = () => {
  const { values, handleChange, handleSubmit } = useForm(login);
  const [checked, setChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth.jwt) {
      navigate("/");
    } else {
      checkCache();
    }
  }, []);

  function checkCache() {
    const cache = localStorage.getItem("token");
    if (cache) {
      auth.signin(cache, () => {
        navigate(from);
      });
    }
  }

  function login() {
    setIsLoading(true);
    getJwt();
  }

  const getJwt = async () => {
    const credentials = {
      username: values.username,
      password: values.password,
    };
    const response = await loginUser(`${api.url}auth/login/`, credentials);
    if (response) {
      const { access } = response.data;
      if (checked) {
        localStorage.setItem("token", access);
      }
      auth.signin(access, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    } else {
      setShowToast(true);
      setIsLoading(false);
    }
  };

  function renderLogin() {
    return (
      <React.Fragment>
        <ToastContainer className="p-3" position="top-end">
          <Toast
            className="toast"
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header className="toast-header">
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Invalid Credentials</strong>
              <small>Login error</small>
            </Toast.Header>
            <Toast.Body className="toast-body">
              Bad username and/or password
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="account-form m-auto">
          <div className="ms-2 me-2">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="d-grid gap-4 ms-4 me-4">
                  <div className="form-group">
                    <div className="form-group">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="floatingUsername"
                          placeholder="bob123"
                          value={values.username || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="floatingUsername">Username</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={values.password || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-lg btn-primary"
                    type="submit"
                    hidden={isLoading ? true : false}
                  >
                    Login
                  </button>
                  <Spinner
                    className="m-auto"
                    animation="border"
                    role="status"
                    hidden={isLoading ? false : true}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <div className="form-check m-auto">
                    <input
                      type="checkbox"
                      name="saveLogin"
                      className="form-check-input"
                      id="saveLogin"
                      onChange={() => setChecked(!checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Remember me on this computer
                    </label>
                  </div>
                </div>
              </fieldset>
            </form>
            <small>Not registered?</small>
            <Link to="/register"> Register</Link>
          </div>
          {/* <img src={''} alt="Motto" /> */}
        </div>
      </React.Fragment>
    );
  }

  return renderLogin();
};

export default Login;
