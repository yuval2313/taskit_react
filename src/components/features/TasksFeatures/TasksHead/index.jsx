import React from "react";

import { useSelector } from "react-redux";
import { getSearchQuery } from "../../../../store/ui/tasksPage";

import Input from "../../../common/Input";
import Button from "../../../common/Button";
import SortTasks from "../SortTasks";
import LabelFilter from "../LabelFilter";
import SetView from "../SetView";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksHead({ onSearch, onNewTask }) {
  const searchQuery = useSelector(getSearchQuery);

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
        <SetView />
        <SortTasks />
        <LabelFilter />
      </div>
    </div>
  );
}

export default TasksHead;
