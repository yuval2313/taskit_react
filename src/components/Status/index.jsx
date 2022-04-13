import React, { useState } from "react";

import Button from "../common/Button";
import DropdownMenu from "../common/DropdownMenu";
import DropdownItem from "../common/DropdownItem";

import { useClickOutside } from "../../hooks/useClickOutside";

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
    <div ref={menuRef} className={"status-bar dropdown"}>
      <Button
        onClick={handleToggleMenu}
        label={`${status ? getLabel() : "+ Status"}`}
        className={`btn-pill ${status}`}
        tooltip="Set Status"
      />
      <DropdownMenu
        in={showStatuses}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priority}
      >
        {statuses.map((status) => (
          <DropdownItem
            onClick={(e) => {
              return handleSelectOption(e);
            }}
            name={"status"}
            key={status.value}
            value={status.value}
            className={status.value}
          >
            {status.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

export default Status;
