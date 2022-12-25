import React from "react";

import Button from "components/Button";
import Icon from "components/Icon";

import { getReminderInLargestUnit } from "helpers/reminderHelpers";

import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function Reminder({ reminder, onDelete, disabled }) {
  const { getReminderValue, getReminderUnit } =
    getReminderInLargestUnit(reminder);

  return (
    <div className={styles.container}>
      <span className={styles.reminder}>
        <Icon icon={faBell} className={styles.icon} />
        <span>{`${getReminderValue()} ${getReminderUnit()} before`}</span>
      </span>
      {!disabled && (
        <Button icon={faTimes} className={styles.remove} onClick={onDelete} />
      )}
    </div>
  );
}

export default Reminder;
