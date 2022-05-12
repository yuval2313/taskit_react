import React from "react";
import { useSelector } from "react-redux";
import { getSelectedTaskId } from "../../../store/ui/tasksPage";

import { TransitionGroup } from "react-transition-group";

import Background from "../../common/generic/Background";
import Task from "../../Task";

import styles from "./index.module.scss";

function TasksGrid({ tasks }) {
  const selectedTaskId = useSelector(getSelectedTaskId);

  return (
    <div className={styles.container}>
      <Background
        in={selectedTaskId ? true : false}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <TransitionGroup className={styles.grid}>
        {tasks.map((task) =>
          selectedTaskId === task._id ? (
            <Task
              selected
              task={task}
              timeout={300}
              classNames="task-selected-transition"
              key={`selected ${task._id}`}
            />
          ) : (
            <Task
              task={task}
              timeout={300}
              classNames="task-transition"
              key={task._id}
            />
          )
        )}
      </TransitionGroup>
    </div>
  );
}

export default TasksGrid;
