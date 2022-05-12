import React from "react";

import { useSelector } from "react-redux";
import { getSearchQuery } from "../../../store/ui/tasksPage";

import Input from "../../common/generic/Input";
import Button from "../../common/generic/Button";
import SortTasks from "../../common/SortTasks";

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
      <div className={styles.order}>
        <SortTasks />
      </div>
    </div>
  );
}

export default TasksHead;
