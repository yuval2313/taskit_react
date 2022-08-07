import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";

import { useClickOutside } from "hooks/useClickOutside";

import priorities from "constants/priorities";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskPriority({ priority, onChange }) {
  const [showPriorities, setShowPriorities] = useState(false);

  const menuRef = useClickOutside(() => setShowPriorities(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowPriorities(!showPriorities);
  }

  function handleSelectOption(e) {
    setShowPriorities(false);

    const { value: selectedPriority } = e.currentTarget;
    if (selectedPriority !== priority) return onChange(e);
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
                onClick={handleSelectOption}
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

export default TaskPriority;
