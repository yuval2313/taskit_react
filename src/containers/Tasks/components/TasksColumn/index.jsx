import React from "react";
import { TransitionGroup } from "react-transition-group";

import Button from "components/Button";
import Task from "containers/Task";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TasksColumn({ column, onNewTask, data: tasks, selectedTaskId }) {
  function handleAddTask(e) {
    e.currentTarget.value = column.value;
    return onNewTask(e);
  }

  return (
    <div className={styles.column}>
      <div className={styles.head}>
        <span
          className={`${styles.name} ${
            styles[column.value ? column.value : "unset"]
          }`}
        >
          {column.label}
        </span>
        <Button icon={faPlus} className={styles.add} onClick={handleAddTask} />
      </div>
      <TransitionGroup className={styles.body}>
        {tasks.map(
          (task) =>
            task.createdAt && (
              <Task
                task={task}
                table
                hidden={selectedTaskId === task._id}
                timeout={300}
                classNames="task-transition"
                key={`table ${task._id}`}
              />
            )
        )}
      </TransitionGroup>
    </div>
  );
}

export default TasksColumn;
