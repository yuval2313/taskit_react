import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";

import { useClickOutside } from "hooks/useClickOutside";

import styles from "./index.module.scss";
function ReminderUnits({ disabled, unitValue, units, onChange }) {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useClickOutside(handleExit);

  function handleExit() {
    setShowMenu(false);
  }

  function handleToggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleSelectOption(e) {
    onChange(e);
    handleExit();
  }

  function getUnitLabel(unitValue) {
    return units.find((unit) => unit.value === unitValue).label;
  }

  return (
    <div ref={menuRef} className={styles.container}>
      <Button
        disabled={disabled}
        label={getUnitLabel(unitValue)}
        onClick={handleToggleMenu}
      />
      <DropdownMenu
        in={showMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
      >
        {units
          .map(
            (unit) =>
              unit.value !== unitValue && (
                <DropdownItem
                  key={unit.value}
                  onClick={handleSelectOption}
                  value={unit.value}
                  name={"unitValue"}
                >
                  {unit.label}
                </DropdownItem>
              )
          )
          .reverse()}
      </DropdownMenu>
    </div>
  );
}

export default ReminderUnits;
