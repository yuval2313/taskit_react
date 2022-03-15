import React, { useState } from "react";

import {
  faSortAmountDownAlt,
  faSortAmountDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import Button from "./common/Button";
import Dropdown from "./common/Dropdown";

import "../styles/SortTasks.css";

function SortTasks({ sortBy, sortOrder, setSortBy, setSortOrder }) {
  const [showOptions, setShowOptions] = useState(false);

  function handleChange({ currentTarget }) {
    const { value } = currentTarget;
    return setSortBy(value);
  }

  const options = [
    { label: "Title", value: "title" },
    { label: "Edited At", value: "updatedAt" },
    { label: "Status", value: "status" },
  ];

  return (
    <div className="sort-tasks">
      <Button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        icon={sortOrder === "asc" ? faSortAmountDownAlt : faSortAmountDown}
        className="btn-clear sort-order"
      ></Button>
      <Dropdown
        onChange={handleChange}
        showMenu={showOptions}
        setShowMenu={setShowOptions}
        options={options}
        selectedOption={sortBy}
        icon={faCaretDown}
        buttonClassName="btn-clear sort-by"
      />
    </div>
  );
}

export default SortTasks;
