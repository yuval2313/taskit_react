import React from "react";
import Joi from "joi";

import Input from "./Input";
import Button from "./Button";

import "../../styles/common/Form.css";

function Form({
  children,
  schema,
  data,
  errors,
  setData,
  setErrors,
  doSubmit,
  header,
  inputs,
  buttonLabel,
}) {
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

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>{header}</h1>
        {inputs.map((input) => {
          const { name, type, placeholder } = input;
          return (
            <Input
              key={name}
              name={name}
              className="form-control"
              type={type ? type : "text"}
              value={data[name]}
              onChange={handleChange}
              error={errors[name]}
              placeholder={placeholder}
            />
          );
        })}
        <hr className="separator" />
        <Button
          className="btn btn-blue"
          type="submit"
          label={buttonLabel}
          disabled={validate()}
        />
        {children}
      </form>
    </div>
  );
}

Form.defaultProps = {
  inputs: [],
  buttonLabel: "Submit",
};

export default Form;
