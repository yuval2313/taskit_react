import React, { useState } from "react";
import Joi from "joi";

import { useUpdateEffect } from "hooks/useUpdateEffect";
import { formHelpers } from "helpers/formHelpers";

import Button from "components/Button";
import EventReminders from "components/EventReminders";

import styles from "./index.module.scss";

function EventForm({ handleExit, handleSave }) {
  const [data, setData] = useState({
    start: new Date().toISOString().substring(0, 16),
    end: new Date().toISOString().substring(0, 16),
    reminders: [],
  });
  const [errors, setErrors] = useState({});

  useUpdateEffect(() => {
    const errors = validate();
    if (errors) setErrors(errors);
  }, [data]);

  const schema = {
    start: Joi.date()
      .custom((date, helper) => {
        if (date < new Date().setSeconds(0, 0))
          return helper.message("Choose a future start time");
        else return true;
      })
      .required(),
    end: Joi.date()
      .custom((date, helper) => {
        if (date < new Date(data.start).getTime() + 300000)
          return helper.message(
            "End time should be greater than start time by at least 5 minutes"
          );
        else return true;
      })
      .required(),
    reminders: Joi.array(),
  };

  function doSubmit() {
    console.log(data, errors);
    handleExit();
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
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.header}>Calendar Event</h2>

      <div className={styles.form_group}>
        <h3 className={styles.label}>Start</h3>
        {renderInput("start", "datetime-local", styles.input)}
      </div>
      <div className={styles.form_group}>
        <h3 className={styles.label}>End</h3>
        {renderInput("end", "datetime-local", styles.input)}
      </div>
      <div className={styles.form_group}>
        <h3 className={styles.label}>Reminders</h3>
        <EventReminders />
      </div>
      <Button
        className={styles.button}
        label="Submit"
        type="submit"
        disabled={validate()}
      />
    </form>
  );
}

export default EventForm;
