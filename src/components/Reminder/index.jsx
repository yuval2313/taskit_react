import React, { useState } from "react";

import { useClickOutside } from "hooks/useClickOutside";

import Input from "components/Input";
import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function Reminder({ reminder, onChange, onDelete }) {
  const [showUnitMenu, setShowUnitMenu] = useState(false);

  const menuRef = useClickOutside(handleExit);

  function handleExit() {
    setShowUnitMenu(false);
  }

  function handleToggleMenu() {
    setShowUnitMenu(!showUnitMenu);
  }

  const units = [
    { label: "minutes", value: 1 },
    { label: "hours", value: 60 },
    { label: "days", value: 60 * 24 },
    { label: "weeks", value: 60 * 24 * 7 },
  ];

  function getUnitLabel(unitValue) {
    return units.find((unit) => unit.value === unitValue).label;
  }

  return (
    <div className={styles.container}>
      <Input
        value={reminder.value}
        name="value"
        type="number"
        onChange={onChange}
        className={styles.input}
      />
      <div ref={menuRef} className={styles.unit_dropdown}>
        <Button
          label={getUnitLabel(reminder.unitValue)}
          onClick={handleToggleMenu}
        />
        <DropdownMenu
          in={showUnitMenu}
          timeout={500}
          classNames="menu-transition"
          unmountOnExit
        >
          {units.map(
            (unit) =>
              unit.value !== reminder.unitValue && (
                <DropdownItem
                  onClick={(e) => {
                    onChange(e);
                    handleExit();
                  }}
                  value={unit.value}
                  name={"unitValue"}
                >
                  {unit.label}
                </DropdownItem>
              )
          )}
        </DropdownMenu>
      </div>
      <Button icon={faTimes} className={styles.remove} onClick={onDelete} />
    </div>
  );
}

export default Reminder;
