import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import Form from "./common/Form";

import { registerUser } from "../services/userService";
import { loginUserWithJwt } from "../services/authService";

function Register(props) {
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

  const inputs = [
    { name: "name", placeholder: "Name" },
    { name: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <Form
      schema={schema}
      data={data}
      errors={errors}
      setData={setData}
      setErrors={setErrors}
      doSubmit={doSubmit}
      header="Register"
      inputs={inputs}
    >
      <NavLink to="/login">Have an Account?</NavLink>
    </Form>
  );
}

export default Register;
