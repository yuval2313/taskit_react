import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUser } from "../../../store/auth";

import Joi from "joi";

import Button from "../../common/generic/Button";
import Form from "../../common/generic/Form";

import { formHelpers } from "../../../helpers/formHelpers";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) window.location = "/";
  }, [user]);

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
      await dispatch(loginUser(data)).unwrap();
    } catch (ex) {
      const { status, data } = ex;

      if (status === 400) {
        const errorsClone = { ...errors };
        errorsClone.email = data;
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
    <Form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {renderInput("email", "Email", "email")}
      {renderInput("password", "Password", "password")}
      <hr className="separator" />
      <Button type="submit" label="Login" disabled={validate()} />
      <NavLink to="/register">Register</NavLink>
    </Form>
  );
}

export default Login;
