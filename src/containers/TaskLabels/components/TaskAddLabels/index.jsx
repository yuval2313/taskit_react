import React, { useState } from "react";

import { getFilteredLabels, hasMatchingName } from "helpers/labelsHelpers";

import Button from "components/Button";
import Input from "components/Input";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";
import Separator from "components/Separator";
import LabelName from "components/LabelName";

import { useClickOutside } from "hooks/useClickOutside";

import { faTags, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskAddLabels({ onAddLabel, onLabelCreate, labels, priorityStyle }) {
  const [showLabelsMenu, setShowLabelsMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

    return onAddLabel(e);
  }

  async function handleCreateNew() {
    try {
      const label = await onLabelCreate({ name: searchQuery }).unwrap();
      return handleSelectOption({
        currentTarget: { name: "labels", value: label._id },
      });
    } catch (ex) {}
  }

  function getData() {
    return getFilteredLabels(labels, searchQuery);
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
        className={priorityStyle ? styles[priorityStyle] : styles.prt_unset}
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
        {getData().map((label) => (
          <DropdownItem
            key={label._id}
            name={"labels"}
            value={label._id}
            onClick={handleSelectOption}
          >
            <LabelName labelName={label.name} />
          </DropdownItem>
        ))}
        {!hasMatchingName(labels, searchQuery) && searchQuery && (
          <DropdownItem className={styles.create}>
            <LabelName labelName={`"${searchQuery}"`} />
            <Button icon={faPlus} onClick={handleCreateNew} />
          </DropdownItem>
        )}
      </DropdownMenu>
    </div>
  );
}

export default TaskAddLabels;
