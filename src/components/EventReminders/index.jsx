import React, { useState } from "react";

import Button from "components/Button";
import Reminder from "components/Reminder";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
function EventReminders() {
  const [reminders, setReminders] = useState([]);

  function addReminder() {
    const newReminder = {
      value: 10,
      unitValue: 1,
    };

    setReminders([...reminders, newReminder]);
  }

  function editReminder({ currentTarget }, index) {
    const { value, name } = currentTarget;
    const remindersClone = [...reminders];
    remindersClone[index] = { ...reminders[index], [name]: value };
    setReminders(remindersClone);
  }

  function removeReminder(index) {
    const remindersClone = [...reminders];
    remindersClone.splice(index, 1);
    setReminders(remindersClone);
  }

  return (
    <div className={styles.container}>
      {reminders.map((reminder, i) => (
        <Reminder
          reminder={reminder}
          onChange={(e) => editReminder(e, i)}
          onDelete={() => removeReminder(i)}
        />
      ))}
      <Button leftIcon={faBell} label="Add Reminder" onClick={addReminder} />
    </div>
  );
}

export default EventReminders;
