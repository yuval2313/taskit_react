import React, { useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import { Navigate } from "react-router-dom";

import Joi from "joi";

import { loginUser, getCurrentUser } from "../services/authService";

import "../styles/Login.css";

function Login(props) {
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

  function validate() {
    const options = { abortEarly: false };
    const joiObjectSchema = Joi.object(schema);
    const { error } = joiObjectSchema.validate(data, options);
    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const propertySchema = Joi.object({ [name]: schema[name] });
    const { error } = propertySchema.validate(obj);

    return error ? error.details[0].message : null;
  }

  function handleChange({ currentTarget: input }) {
    const errorsClone = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) errorsClone[input.name] = errorMessage;
    else delete errorsClone[input.name];

    const dataClone = { ...data };
    dataClone[input.name] = input.value;

    setData(dataClone);
    setErrors(errorsClone);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  }

  async function doSubmit() {
    try {
      await loginUser(data);

      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      const { response } = ex;

      if (response && response.status === 400) {
        const errorsClone = { ...errors };
        errorsClone.email = response.data;
        return setErrors(errorsClone);
      }
    }
  }

  const user = getCurrentUser();

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <Input
          name="email"
          className="form-control"
          type="text"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name="password"
          className="form-control"
          type="text"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <hr className="separator" />
        <Button
          className="btn btn-blue"
          type="submit"
          label="Login"
          disabled={validate()}
        ></Button>
      </form>
    </div>
  );
}

export default Login;
