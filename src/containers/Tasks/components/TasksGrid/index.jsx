import React from "react";
import { TransitionGroup } from "react-transition-group";

import Task from "containers/Task";

import styles from "./index.module.scss";

function TasksGrid({ tasks, selectedTaskId }) {
  function isSelected(task) {
    return selectedTaskId === task._id;
  }

  return (
    <div className={styles.container}>
      <TransitionGroup className={styles.grid}>
        {tasks.map(
          (task) =>
            task.createdAt && (
              <Task
                task={task}
                hidden={isSelected(task)}
                timeout={300}
                classNames="task-transition"
                key={`grid ${task._id}`}
              />
            )
        )}
      </TransitionGroup>
    </div>
  );
}

export default TasksGrid;
