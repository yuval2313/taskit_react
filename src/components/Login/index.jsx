import React, { useState, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Joi from "joi";

import UserContext from "../../context/UserContext";

import Button from "../common/Button";

import { loginUser } from "../../services/authService";
import { formHelpers } from "../../helpers/formHelpers";

import "../../commonStyles/Form.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const user = useContext(UserContext);

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .min(6)
      .max(50)
      .label("Email"),
    password: Joi.string().min(8).max(50).required().label("Password"),
  };

  async function doSubmit() {
    try {
      await loginUser(data);

      window.location = "/";
    } catch (ex) {
      const { response } = ex;

      if (response && response.status === 400) {
        const errorsClone = { ...errors };
        errorsClone.email = response.data;
        return setErrors(errorsClone);
      }
    }
  }

  const { validate, handleSubmit, renderInput } = formHelpers(
    schema,
    data,
    errors,
    setData,
    setErrors,
    doSubmit
  );

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        <hr className="separator" />
        <Button
          className="btn btn-blue"
          type="submit"
          label="Login"
          disabled={validate()}
        />
        <NavLink className="link" to="/register">
          Register
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
