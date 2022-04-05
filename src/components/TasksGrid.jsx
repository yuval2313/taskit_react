import React from "react";
import { TransitionGroup } from "react-transition-group";

import Background from "./common/Background";
import Task from "./Task";
import SelectedTask from "./SelectedTask";

function TasksGrid({ tasks, selectedTask }) {
  return (
    <div className="tasks-grid-container">
      <Background
        in={selectedTask ? true : false}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <TransitionGroup className={"tasks-grid"}>
        {tasks.map((task) =>
          selectedTask && selectedTask._id === task._id ? (
            <SelectedTask
              selectedTask={task}
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
