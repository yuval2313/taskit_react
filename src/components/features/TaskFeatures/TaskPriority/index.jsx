import React, { useState, useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import DropdownItem from "../../../common/DropdownItem";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskPriority() {
  const [showPriorities, setShowPriorities] = useState(false);
  const { task, handlers } = useContext(TaskContext);

  const { priority } = task;
  const { handleChange } = handlers;

  const menuRef = useClickOutside(() => setShowPriorities(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowPriorities(!showPriorities);
  }

  function handleSelectOption(e) {
    setShowPriorities(false);
    return handleChange(e);
  }

  function getLabel() {
    return priorities.filter((p) => p.value === priority)[0].label;
  }

  return (
    <div ref={menuRef} className={styles.dropdown}>
      <Button
        onClick={handleToggleMenu}
        label={`${priority ? getLabel() : "+ Priority"}`}
        rightIcon={faExclamationTriangle}
        tooltip="Set Priority"
      />
      <DropdownMenu
        in={showPriorities}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={styles[priority]}
      >
        {priorities.map(
          (p) =>
            p.value && (
              <DropdownItem
                onClick={(e) => {
                  return handleSelectOption(e);
                }}
                name={"priority"}
                key={p.value}
                value={p.value}
                className={styles[p.value]}
              >
                {p.label}
              </DropdownItem>
            )
        )}
      </DropdownMenu>
    </div>
  );
}

export const priorities = [
  { label: "Urgent", value: "urgent" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "No Priority", value: "" },
];
export default TaskPriority;
