import React, { useState } from "react";

import Button from "../common/Button";
import DropdownMenu from "../common/DropdownMenu";
import DropdownItem from "../common/DropdownItem";

import { useClickOutside } from "../../hooks/useClickOutside";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// import "../styles/Priority.css";

function Priority({ priority, onChange }) {
  const [showPriorities, setShowPriorities] = useState(false);

  const menuRef = useClickOutside(() => setShowPriorities(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowPriorities(!showPriorities);
  }

  function handleSelectOption(e) {
    setShowPriorities(false);
    return onChange(e);
  }

  function getLabel() {
    return priorities.filter((p) => p.value === priority)[0].label;
  }

  const priorities = [
    { label: "Urgent", value: "urgent" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div ref={menuRef} className={"priority-bar dropdown"}>
      <Button
        onClick={handleToggleMenu}
        label={`${priority ? getLabel() : "+ Priority"}`}
        rightIcon={faExclamationTriangle}
        className={`btn-pill`}
        tooltip="Set Priority"
      />
      <DropdownMenu
        in={showPriorities}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priority}
      >
        {priorities.map((priority) => (
          <DropdownItem
            onClick={(e) => {
              return handleSelectOption(e);
            }}
            name={"priority"}
            key={priority.value}
            value={priority.value}
            className={priority.value}
          >
            {priority.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}

export default Priority;
