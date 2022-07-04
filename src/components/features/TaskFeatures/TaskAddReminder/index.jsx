import React, { useState, useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import RemindersForm from "../../ReminderFeatures/ReminderForm";

import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskAddReminder() {
  const [showRemindersMenu, setShowRemindersMenu] = useState(false);

  const { task } = useContext(TaskContext);
  const { priority } = task;

  const menuRef = useClickOutside(handleExit);

  function handleExit() {
    setShowRemindersMenu(false);
  }

  function handleToggleMenu() {
    return setShowRemindersMenu(!showRemindersMenu);
  }
  return (
    <div ref={menuRef} className={styles.container}>
      <Button
        className={styles.add}
        icon={faBell}
        onClick={handleToggleMenu}
        tooltip="Add Reminder"
      />
      <DropdownMenu
        in={showRemindersMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priority ? styles[priority] : styles.prt_unset}
      >
        <RemindersForm handleExit={handleExit} />
      </DropdownMenu>
    </div>
  );
}

export default TaskAddReminder;
