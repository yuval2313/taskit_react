import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  sortTasksBy,
  changeSortOrder,
  getSortBy,
  getSortOrder,
} from "../../../../store/ui/tasksPage";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import DropdownItem from "../../../common/DropdownItem";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import {
  faSortAmountDownAlt,
  faSortAmountDown,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function SortTasks() {
  const dispatch = useDispatch();
  const sortBy = useSelector(getSortBy);
  const sortOrder = useSelector(getSortOrder);

  const [showOptions, setShowOptions] = useState(false);

  const menuRef = useClickOutside(() => setShowOptions(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowOptions(!showOptions);
  }

  function handleSelectOption({ currentTarget }) {
    const { value } = currentTarget;

    setShowOptions(false);
    return dispatch(sortTasksBy(value));
  }

  function handleToggleOrder() {
    dispatch(changeSortOrder());
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
    <div className={styles.sort_tasks}>
      <Button
        onClick={handleToggleOrder}
        icon={sortOrder === "asc" ? faSortAmountDownAlt : faSortAmountDown}
        className={styles.sort_order}
        tooltip="Sort Order"
      />
      <div ref={menuRef} className={styles.sort_dropdown}>
        <Button
          onClick={handleToggleMenu}
          label={getLabel()}
          rightIcon={faCaretDown}
          className={styles.sort_by}
          tooltip="Sort By"
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
