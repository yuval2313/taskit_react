import React from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  getTableSort,
  getSearchQuery,
  clearQuery,
} from "./../../../../store/ui/tasksPage/index";
import { getSelectedLabelId } from "../../../../store/ui/labelsSideBar";

import { addTask } from "../../../../store/entities/tasks";

import { statuses } from "./../../TaskFeatures/TaskStatus/index";
import { priorities } from "../../TaskFeatures/TaskPriority";

import TasksColumn from "../TasksColumn";

import styles from "./index.module.scss";

function TasksTable({ tasks }) {
  const dispatch = useDispatch();
  const tableSort = useSelector(getTableSort);
  const searchQuery = useSelector(getSearchQuery);
  const selectedLabelId = useSelector(getSelectedLabelId);

  function handleNewTask(value) {
    dispatch(
      addTask({
        title: searchQuery,
        labels: selectedLabelId ? [selectedLabelId] : [],
        [tableSort]: value,
      })
    );

    if (searchQuery) dispatch(clearQuery());
  }

  function getColumnData(column) {
    return tasks.filter((t) => t[tableSort] === column.value);
  }

  const columns = tableSort === "status" ? statuses : priorities;

  return (
    <div className={styles.container}>
      {columns.map((column) => (
        <TasksColumn
          key={column.value}
          data={getColumnData(column)}
          column={column}
          onNewTask={handleNewTask}
        />
      ))}
    </div>
  );
}

export default TasksTable;
