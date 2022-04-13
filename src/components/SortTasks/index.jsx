import React, { useState } from "react";

import {
  faSortAmountDownAlt,
  faSortAmountDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../common/Button";
import DropdownMenu from "../common/DropdownMenu";
import DropdownItem from "../common/DropdownItem";

import { useClickOutside } from "../../hooks/useClickOutside";

import "./index.css";

function SortTasks({ sortBy, sortOrder, setSortBy, setSortOrder }) {
  const [showOptions, setShowOptions] = useState(false);

  const menuRef = useClickOutside(() => setShowOptions(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowOptions(!showOptions);
  }

  function handleSelectOption({ currentTarget }) {
    const { value } = currentTarget;

    setShowOptions(false);
    return setSortBy(value);
  }

  function getLabel() {
    return options.filter((option) => option.value === sortBy)[0].label;
  }

  const options = [
    { label: "Title", value: "title" },
    { label: "Edited At", value: "updatedAt" },
    { label: "Status", value: "status" },
    { label: "Priority", value: "priority" },
  ];

  return (
    <div className="sort-tasks">
      <Button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        icon={sortOrder === "asc" ? faSortAmountDownAlt : faSortAmountDown}
        className="btn-clear sort-order"
      ></Button>
      <div ref={menuRef} className={"dropdown"}>
        <Button
          onClick={handleToggleMenu}
          label={getLabel()}
          rightIcon={faCaretDown}
          className="btn-clear sort-by"
          tooltip={"Sort By"}
        />
        <DropdownMenu
          in={showOptions}
          timeout={500}
          classNames="menu-transition"
          unmountOnExit
        >
          {options.map((option) => (
            <DropdownItem
              onClick={(e) => {
                return handleSelectOption(e);
              }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SortTasks;
