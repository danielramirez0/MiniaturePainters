import React, { useEffect, useState } from "react";
import "./login.css";
import useForm from "../useForm/useForm";
import useAPI from "../useAPI/useAPI";
import useAuth from "../../components/useAuth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  ToastContainer,
  Toast,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { defaultPostRequest as loginUser } from "../../static/main";
import jwtDecode from "jwt-decode";

const Login = () => {
  const { values, handleChange, handleSubmit } = useForm(login);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (!auth.jwt) {
      checkCache();
    }
  }, []);

  useEffect(() => {
    if (auth.jwt) {
      decodeJWT();
    }
  }, [auth.jwt]);

  function checkCache() {
    const cache = localStorage.getItem("token");
    if (cache) {
      auth.signin(cache, () => {
        navigate(from);
      });
    }
  }

  function decodeJWT() {
    if (auth.jwt) {
      setUserDetails(jwtDecode(auth.jwt));
    }
  }

  function login() {
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
      localStorage.setItem("token", access);
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
    }
  };

  function renderLogin() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Miniature Painters</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {auth.jwt ? (
                <Navbar.Text>
                  Signed in as: <a href="/logoff">{userDetails.user_id}</a>
                </Navbar.Text>
              ) : (
                <React.Fragment>
                  <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                      type="text"
                      name="username"
                      value={values.username || ""}
                      onChange={handleChange}
                      placeholder="username"
                      className="me-2"
                      aria-label="username"
                    />
                    <FormControl
                      type="password"
                      name="password"
                      value={values.password || ""}
                      onChange={handleChange}
                      placeholder="password"
                      className="me-2"
                      aria-label="password"
                    />
                    <Button type="submit">Login</Button>
                  </Form>
                  <Link to="/register" className="nav-link">
                    Sign up
                  </Link>
                </React.Fragment>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
      </React.Fragment>
    );
  }

  return renderLogin();
};

export default Login;
