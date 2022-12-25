import React from "react";

import Reminder from "components/Reminder";
import ReminderForm from "components/ReminderForm";
import Separator from "components/Separator";

import styles from "./index.module.scss";
function EventReminders({ reminders, setReminders, disabled }) {
  function addReminder(newReminder) {
    setReminders([...reminders, newReminder]);
  }

  function removeReminder(index) {
    const remindersClone = [...reminders];
    remindersClone.splice(index, 1);
    setReminders(remindersClone);
  }

  return (
    <div className={styles.container}>
      {reminders.length ? (
        reminders.map((reminder, i) => (
          <Reminder
            key={i}
            reminder={reminder}
            onDelete={() => removeReminder(i)}
            disabled={disabled}
          />
        ))
      ) : (
        <span className={styles.message}>You can add up to 5 reminders...</span>
      )}
      {reminders.length < 5 && !disabled && (
        <div>
          <Separator />
          <ReminderForm onAdd={addReminder} />
        </div>
      )}
    </div>
  );
}

export default EventReminders;
