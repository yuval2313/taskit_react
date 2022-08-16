import React from "react";
import { TransitionGroup } from "react-transition-group";

import Task from "containers/Task";

import styles from "./index.module.scss";

function TasksGrid({ tasks, selectedTaskId }) {
  return (
    <div className={styles.container}>
      <TransitionGroup className={styles.grid}>
        {tasks.map(
          (task) =>
            task.createdAt && (
              <Task
                task={task}
                hidden={selectedTaskId === task._id}
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
