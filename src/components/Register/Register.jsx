import "./register.css";
import React, { useEffect, useState } from "react";
import useForm from "../useForm/useForm";
import { useNavigate } from "react-router";
import { defaultPostRequest as submitRegistration } from "../../static/main";
import useAPI from "../useAPI/useAPI";
import useAuth from "../useAuth/useAuth";
import { ToastContainer, Toast } from "react-bootstrap";

const Register = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(registerUser);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (!auth.jwt) {
      checkCache();
    }
  }, []);

  function checkCache() {
    const cache = localStorage.getItem("token");
    if (cache) {
      auth.signin(cache, () => {
        navigate(from, { replace: true });
      });
    }
  }

  async function registerUser() {
    const registrationData = {
      username: values.username,
      password: values.password,
      email: values.email,
      years_experience: values.years_experience,
    };

    const response = await submitRegistration(
      `${api.url}auth/register/`,
      registrationData
    );
    if (response) {
      const { access } = response.data;
      localStorage.setItem("token", access);
      auth.signin(access, () => {
          window.location.reload(true)
      });
    } else {
      setShowToast(true);
    }
  }

  function renderRegister() {
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="ms-4 me-4">
              <div className="form-group mt-4 mb-4">
                <small>
                  Used for login and for others to recognize your work!
                </small>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    placeholder="username"
                    value={values.username || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <small>Enter a valid email address</small>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={values.email || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                <small>
                  How many years have you been painting? Use 0 for less than 1
                </small>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    name="years_experience"
                    className="form-control"
                    id="years-experience"
                    placeholder="Years of experience"
                    value={values.years_experience || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="years-experience">Years of experience</label>
                </div>
                <small>Passwords are case-sensitive</small>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    value={values.password || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password</label>
                  <p className="errors">
                    {errors.password ? `${errors.password}` : null}
                  </p>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="verifyPassword"
                    className="form-control"
                    id="verifyPassword"
                    placeholder="verifyPassword"
                    value={values.verifyPassword || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="verifyPassword">Confirm password</label>
                  <p className="errors">
                    {errors.verifyPassword ? `${errors.verifyPassword}` : null}
                  </p>
                </div>
              </div>
              <button
                disabled={
                  errors.password ||
                  errors.verifyPassword ||
                  values.password == null ||
                  values.verifyPassword == null ||
                  values.username == null ||
                  values.years_experience == null ||
                  values.email == null ||
                  null
                }
                className="btn btn-primary mb-4"
                type="submit"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>

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
              <strong className="me-auto">{values.username}</strong>
              <small>Registration Error</small>
            </Toast.Header>
            <Toast.Body className="toast-body">
              One or more issues during registration. See the console for error
              details.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </React.Fragment>
    );
  }

  return renderRegister();
};

export default Register;
