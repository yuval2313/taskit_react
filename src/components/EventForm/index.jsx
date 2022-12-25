import React, { useState, useEffect } from "react";

import { useUpdateEffect } from "hooks/useUpdateEffect";
import { formHelpers } from "helpers/formHelpers";
import { getLocalDate } from "helpers/dateHelpers";
import eventSchema from "constants/eventSchema";

import FormGroup from "components/FormGroup";
import DatePicker from "components/DatePicker";
import EventReminders from "components/EventReminders";
import EventFormSubmit from "components/EventFormSubmit";

import styles from "./index.module.scss";

function EventForm({ onSave, onDelete, onEdit, event, onExit }) {
  const [data, setData] = useState({
    start: getLocalDate(),
    end: getLocalDate(Date.now() + 3600000),
    reminders: [],
  });
  const [errors, setErrors] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setData(maptoData(event));
  }, [event]);

  useUpdateEffect(() => {
    const errors = validate();
    if (errors) setErrors(errors);
    else setErrors({});
  }, [data]);

  function doSubmit() {
    if (event) onEdit(data);
    else onSave(data);

    onExit();
  }

  const { validate, handleSubmit, handleChange } = formHelpers(
    eventSchema,
    data,
    errors,
    setData,
    setErrors,
    doSubmit
  );

  function maptoData(event) {
    const data = {
      start: getLocalDate(),
      end: getLocalDate(Date.now() + 3600000),
      reminders: [],
    };

    if (event) {
      data.start = getLocalDate(event.start.dateTime);
      data.end = getLocalDate(event.end.dateTime);
      data.reminders = event.reminders.useDefault
        ? []
        : event.reminders.overrides.map((reminder) => reminder.minutes);
    }

    return data;
  }

  function setReminders(reminders) {
    handleChange({ currentTarget: { name: "reminders", value: reminders } });
  }

  function handleDelete() {
    onDelete(event.id);
    onExit();
  }

  function handleSetEdit() {
    setEditable(true);
  }

  function handleCancelEdit() {
    setEditable(false);
    setData(maptoData(event));
  }

  function handleSubmitEdit(e) {
    setEditable(false);
    handleSubmit(e);
  }

  function isEditable() {
    return !event || (!!event && editable);
  }

  return (
    <form className={styles.container}>
      <h2 className={styles.header}>{`${event ? "Edit" : "Create"} Event`}</h2>
      <FormGroup label="Start">
        <DatePicker
          name="start"
          value={data["start"]}
          onChange={handleChange}
          error={errors["start"]}
          disabled={!isEditable()}
        />
      </FormGroup>
      <FormGroup label="End">
        <DatePicker
          name="end"
          value={data["end"]}
          onChange={handleChange}
          error={errors["end"]}
          disabled={!isEditable()}
        />
      </FormGroup>
      <FormGroup label="Reminders">
        <EventReminders
          reminders={data.reminders}
          setReminders={setReminders}
          disabled={!isEditable()}
        />
      </FormGroup>
      <EventFormSubmit
        event={event}
        editable={editable}
        disabled={validate()}
        onSubmit={handleSubmit}
        onSubmitEdit={handleSubmitEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDelete}
        onSetEdit={handleSetEdit}
      />
    </form>
  );
}

export default EventForm;
