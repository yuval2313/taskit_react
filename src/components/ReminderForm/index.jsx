import React, { useState } from "react";
import { useUpdateEffect } from "hooks/useUpdateEffect";

import Input from "components/Input";
import ReminderUnits from "components/ReminderUnits";
import Button from "components/Button";

import { formHelpers } from "helpers/formHelpers";
import units from "constants/timeIntervalUnits";
import reminderSchema from "constants/reminderSchema";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
function ReminderForm({ onAdd }) {
  const [data, setData] = useState({
    value: 10,
    unitValue: 1,
  });
  const [errors, setErrors] = useState({});

  useUpdateEffect(() => {
    const errors = validate();
    if (errors) setErrors(errors);
    else setErrors({});
  }, [data]);

  function doSubmit() {
    onAdd(data.value * data.unitValue);
  }

  const { handleChange, handleSubmit, validate } = formHelpers(
    reminderSchema,
    data,
    errors,
    setData,
    setErrors,
    doSubmit
  );

  return (
    <div className={styles.container}>
      <div className={styles.reminder}>
        <Input
          value={data.value}
          name="value"
          type="number"
          onChange={handleChange}
          className={styles.input}
        />
        <ReminderUnits
          unitValue={data.unitValue}
          units={units}
          onChange={handleChange}
        />
        <Button icon={faPlus} onClick={handleSubmit} disabled={validate()} />
      </div>
      {errors["value"] && <div className={styles.error}>{errors["value"]}</div>}
    </div>
  );
}

export default ReminderForm;
