import React from "react";
import { TransitionGroup } from "react-transition-group";

import Background from "../common/Background";
import Task from "../Task";

function TasksGrid({ tasks, selectedTaskId }) {
  return (
    <div className="tasks-grid-container">
      <Background
        in={selectedTaskId ? true : false}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <TransitionGroup className={"tasks-grid"}>
        {tasks.map((task) =>
          selectedTaskId === task._id ? (
            <Task
              task={task}
              selected
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
