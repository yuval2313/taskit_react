import React from "react";

import TasksColumn from "../TasksColumn";

import statuses from "constants/statuses";
import priorities from "constants/priorities";

import styles from "./index.module.scss";

function TasksTable({ tasks, tableSort, selectedTaskId, onNewTask }) {
  function handleAddTask(value) {
    return onNewTask({ currentTarget: { value } });
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
          selectedTaskId={selectedTaskId}
          onAddTask={handleAddTask}
        />
      ))}
    </div>
  );
}

export default TasksTable;
