import React, { useState, useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import { useSelector } from "react-redux";
import { getLabelsExceptIds } from "../../../../store/entities/labels";

import Button from "../../../common/Button";
import Input from "../../../common/Input";
import DropdownMenu from "../../../common/DropdownMenu";
import Separator from "../../../common/Separator";
import TaskAddLabelsItem from "../TaskAddLabelsItem";
import TaskAddLabelsCreate from "../TaskAddLabelsCreate";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import { faTags } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskAddLabels() {
  const [showLabelsMenu, setShowLabelsMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { task, handlers } = useContext(TaskContext);
  const { labels: labelIds, priority } = task;
  const { handleChange } = handlers;

  const labels = useSelector(getLabelsExceptIds(labelIds));

  const menuRef = useClickOutside(() => setShowLabelsMenu(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowLabelsMenu(!showLabelsMenu);
  }

  function handleSearch({ currentTarget }) {
    setSearchQuery(currentTarget.value);
  }

  function clearSearch() {
    setSearchQuery("");
  }

  function handleSelectOption(e) {
    setShowLabelsMenu(false);
    clearSearch();

    const { value: labelId } = e.currentTarget;
    e.currentTarget.value = [...labelIds, labelId];

    return handleChange(e);
  }

  function getFilteredLabels() {
    const filteredLabels = searchQuery
      ? labels.filter((l) => l.name.match(new RegExp(`${searchQuery}`, "i")))
      : labels;
    return filteredLabels;
  }

  function hasMatchingName() {
    const filteredLabels = labels.filter((l) =>
      l.name.match(new RegExp(`^${searchQuery}$`))
    );
    if (filteredLabels.length) return true;
    return false;
  }

  return (
    <div ref={menuRef} className={styles.container}>
      <Button
        className={styles.add}
        label="+"
        rightIcon={faTags}
        tooltip="Add Label"
        onClick={handleToggleMenu}
      />
      <DropdownMenu
        in={showLabelsMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
        className={priority ? styles[priority] : styles.prt_unset}
      >
        <Input
          placeholder={labels.length ? "Search..." : "Create..."}
          className={styles.search}
          value={searchQuery}
          onChange={handleSearch}
          maxLength={50}
          autoFocus
        />
        <Separator className={styles.separator} />
        {!labels.length && (
          <p className={styles.nolabels}>
            {"No available labels... \n Try creating a new one!"}
          </p>
        )}
        {getFilteredLabels().map((label) => (
          <TaskAddLabelsItem
            key={label._id}
            label={label}
            onClick={(e) => handleSelectOption(e)}
          />
        ))}
        {!hasMatchingName() && searchQuery && (
          <TaskAddLabelsCreate
            newLabelName={searchQuery}
            onSelect={handleSelectOption}
          />
        )}
      </DropdownMenu>
    </div>
  );
}

export default TaskAddLabels;
