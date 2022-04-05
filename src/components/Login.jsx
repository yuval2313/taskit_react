import React, { useState, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Joi from "joi";

import UserContext from "../context/UserContext";

import Form from "./common/Form";

import { loginUser } from "../services/authService";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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

  const user = useContext(UserContext);

  const inputs = [
    { name: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return user ? (
    <Navigate to="/" />
  ) : (
    <Form
      schema={schema}
      data={data}
      errors={errors}
      setData={setData}
      setErrors={setErrors}
      doSubmit={doSubmit}
      header="Sign In"
      inputs={inputs}
      buttonLabel="Login"
    >
      <NavLink className="link" to="/register">
        Register
      </NavLink>
    </Form>
  );
}

export default Login;