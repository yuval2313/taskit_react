import React from "react";

import Input from "components/Input";
import Button from "components/Button";
import SortTasks from "components/SortTasks";
import LabelFilter from "components/LabelFilter";
import SetView from "components/SetView";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksHead({
  searchQuery,
  sortBy,
  sortOrder,
  view,
  tableSort,
  selectedLabel,
  onSearch,
  onSortBy,
  onToggleSortOrder,
  onToggleView,
  onToggleTableSort,
  onDeselectLabel,
  onNewTask,
}) {
  return (
    <div className={styles.head}>
      <div className={styles.search}>
        <Input
          name="search"
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={onSearch}
        />
        <Button icon={faPlus} onClick={onNewTask} tooltip="Add Task" />
      </div>
      <div className={styles.view}>
        <SetView
          view={view}
          tableSort={tableSort}
          onToggleView={onToggleView}
          onToggleTableSort={onToggleTableSort}
        />
        <SortTasks
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortBy={onSortBy}
          onToggleSortOrder={onToggleSortOrder}
        />
        <LabelFilter
          selectedLabel={selectedLabel}
          onDeselectLabel={onDeselectLabel}
        />
      </div>
    </div>
  );
}

export default TasksHead;
