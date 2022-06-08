import React, { useState, useContext } from "react";
import TaskContext from "../../context/TaskContext";

import { useSelector, useDispatch } from "react-redux";
import { getLabelsExceptIds, addLabel } from "../../../store/entities/labels";

import Button from "../../common/generic/Button";
import Input from "../../common/generic/Input";
import DropdownMenu from "../../common/generic/DropdownMenu";
import LabelDropdownItem from "../LabelDropdownItem";
import LabelDropdownCreate from "../LabelDropdownCreate";
import Separator from "../../common/generic/Separator";

import { useClickOutside } from "../../../hooks/useClickOutside";

import { faTags } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabelsDropdown() {
  const [showLabelsMenu, setShowLabelsMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { task, handlers } = useContext(TaskContext);
  const { labels: labelIds, priority } = task;
  const { handleChange } = handlers;

  const labels = useSelector(getLabelsExceptIds(labelIds));
  const dispatch = useDispatch();

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

  async function handleCreate(e) {
    try {
      const label = await dispatch(addLabel({ name: searchQuery })).unwrap();
      handleSelectOption({
        ...e,
        currentTarget: { name: "labels", value: label._id },
      });
      return clearSearch();
    } catch (ex) {}
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
        rightIcon={faTags}
        label="+"
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
        />
        <Separator />
        {!labels.length && (
          <p className={styles.nolabels}>
            {"No available labels... \n  Try creating a new one!"}
          </p>
        )}
        {getFilteredLabels().map((label) => (
          <LabelDropdownItem
            key={label._id}
            label={label}
            onClick={(e) => handleSelectOption(e)}
          />
        ))}
        {!hasMatchingName() && searchQuery && (
          <LabelDropdownCreate
            newLabelName={searchQuery}
            onCreate={handleCreate}
          />
        )}
      </DropdownMenu>
    </div>
  );
}

export default TaskLabelsDropdown;
