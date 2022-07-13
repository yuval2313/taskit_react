import React from "react";

import { useSelector } from "react-redux";
import { getReminders } from "../../../../store/entities/reminders";

import Reminder from "../Reminder";
import DropdownItem from "../../../common/DropdownItem";

import styles from "./index.module.scss";

function Reminders() {
  const reminders = useSelector(getReminders);

  return (
    <div className={styles.container}>
      {reminders.map((reminder) => (
        <DropdownItem>
          <Reminder key={reminder._id} reminder={reminder} />
        </DropdownItem>
      ))}
    </div>
  );
}

export default Reminders;
