import "./register.css";
import React, { useEffect } from "react";
import useForm from "../useForm/useForm";
import { useNavigate } from "react-router";
import { defaultPostRequest } from "../../static/main";
import useAPI from "../useAPI/useAPI";
import useAuth from "../useAuth/useAuth";

const Register = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(registerUser);
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/home";

  useEffect(() => {
    if (auth.jwt) {
      navigate(from);
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

  async function registerUser() {
    const registrationData = {
      username: values.username,
      password: values.password,
      email: values.email,
    };

    const response = await defaultPostRequest(
      `${api.url}auth/`,
      registrationData
    );
    if (response) {
      const { access } = response.data;
      await auth.signin(access);
      navigate("/");
    }
  }

  function renderUserForm() {
    return (
      <fieldset>
        <div className="ms-4 me-4">
          <div className="form-group mt-4 mb-4">
            <small>Used for login and for others to recognize your work!</small>
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
              values.email == null ||
              values.firstName == null ||
              values.lastName == null ||
              null
            }
            className="btn btn-primary mb-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </fieldset>
    );
  }

  return (
    <div id="registration">
      <div className="account-form m-auto">
        <h1>Account Registration</h1>
        <form onSubmit={handleSubmit}>{renderUserForm()}</form>
      </div>
    </div>
  );
};

export default Register;
