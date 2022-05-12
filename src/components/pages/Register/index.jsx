import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, getUser } from "../../../store/auth";

import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

import Button from "../../common/generic/Button";
import Form from "../../common/generic/Form";

import { formHelpers } from "../../../helpers/formHelpers";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) window.location = "/";
  }, [user]);

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
      await dispatch(registerUser(data)).unwrap();
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
      <h1>Register</h1>
      {renderInput("name", "Name")}
      {renderInput("email", "Email", "email")}
      {renderInput("password", "Password", "password")}
      <hr className="separator" />
      <Button type="submit" label="Submit" disabled={validate()} />
      <NavLink to="/login">Have an Account?</NavLink>
    </Form>
  );
}

export default Register;
