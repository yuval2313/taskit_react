import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import Button from "../common/Button";

import { registerUser } from "../../services/userService";
import { loginUserWithJwt } from "../../services/authService";
import { formHelpers } from "../../helpers/formHelpers";

import "../../commonStyles/Form.css";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const complexityOptions = {
    min: 8,
    max: 50,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 3,
  };

  const schema = {
    name: Joi.string().min(2).max(50).required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .min(6)
      .max(50)
      .label("Email"),
    password: passwordComplexity(complexityOptions)
      .required()
      .label("Password"),
  };

  async function doSubmit() {
    try {
      const { headers } = await registerUser(data);

      loginUserWithJwt(headers["x-auth-token"]);

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

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {renderInput("name", "Name")}
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        <hr className="separator" />
        <Button
          className="btn btn-blue"
          type="submit"
          label="Submit"
          disabled={validate()}
        />
        <NavLink to="/login">Have an Account?</NavLink>
      </form>
    </div>
  );
}

export default Register;
