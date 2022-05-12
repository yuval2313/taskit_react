import React, { useState } from "react";

import Button from "../generic/Button";
import DropdownMenu from "../generic/DropdownMenu";
import DropdownItem from "../generic/DropdownItem";

import { useClickOutside } from "../../../hooks/useClickOutside";

import styles from "./index.module.scss";

function Status({ status, priority, onChange }) {
  const [showStatuses, setShowStatuses] = useState(false);

  const menuRef = useClickOutside(() => setShowStatuses(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowStatuses(!showStatuses);
  }

  function handleSelectOption(e) {
    setShowStatuses(false);
    return onChange(e);
  }

  function getLabel() {
    return statuses.filter((s) => s.value === status)[0].label;
  }

  const statuses = [
    { label: "Not Started", value: "todo" },
    { label: "In Progress", value: "doing" },
    { label: "Complete!", value: "complete" },
  ];

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
        {statuses.map((s) => (
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
        ))}
      </DropdownMenu>
    </div>
  );
}

export default Status;
