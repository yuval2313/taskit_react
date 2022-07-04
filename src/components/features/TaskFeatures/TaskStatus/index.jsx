import React, { useState, useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import DropdownItem from "../../../common/DropdownItem";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import styles from "./index.module.scss";

function TaskStatus() {
  const [showStatuses, setShowStatuses] = useState(false);
  const { task, handlers } = useContext(TaskContext);

  const { status, priority } = task;
  const { handleChange } = handlers;

  const menuRef = useClickOutside(() => setShowStatuses(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowStatuses(!showStatuses);
  }

  function handleSelectOption(e) {
    setShowStatuses(false);
    return handleChange(e);
  }

  function getLabel() {
    return statuses.filter((s) => s.value === status)[0].label;
  }

  return (
    <div ref={menuRef} className={styles.status_dropdown}>
      <Button
        onClick={handleToggleMenu}
        label={`${status ? getLabel() : "+ Status"}`}
        className={styles[status]}
        tooltip="Set Status"
      />
      <DropdownMenu
        in={showStatuses}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priority ? styles[priority] : styles.prt_unset}
      >
        {statuses.map(
          (s) =>
            s.value && (
              <DropdownItem
                onClick={(e) => {
                  return handleSelectOption(e);
                }}
                name={"status"}
                key={s.value}
                value={s.value}
                className={styles[s.value]}
              >
                {s.label}
              </DropdownItem>
            )
        )}
      </DropdownMenu>
    </div>
  );
}

export const statuses = [
  { label: "Complete!", value: "complete" },
  { label: "In Progress", value: "doing" },
  { label: "Not Started", value: "todo" },
  { label: "No Status", value: "" },
];

export default TaskStatus;
