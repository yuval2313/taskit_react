import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";

import { useClickOutside } from "hooks/useClickOutside";

import statuses from "constants/statuses";

import styles from "./index.module.scss";

function TaskStatus({ status, priorityStyle, onChange }) {
  const [showStatuses, setShowStatuses] = useState(false);

  const menuRef = useClickOutside(() => setShowStatuses(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowStatuses(!showStatuses);
  }

  function handleSelectOption(e) {
    setShowStatuses(false);

    const { value: selectedStatus } = e.currentTarget;
    if (selectedStatus !== status) return onChange(e);
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
        className={priorityStyle ? styles[priorityStyle] : styles.prt_unset}
      >
        {statuses.map(
          (s) =>
            s.value && (
              <DropdownItem
                onClick={handleSelectOption}
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

export default TaskStatus;
