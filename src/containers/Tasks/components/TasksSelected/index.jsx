import React from "react";
import { TransitionGroup } from "react-transition-group";

import Background from "components/Background";
import Task from "containers/Task";

function TasksSelected({ tasks, selectedTaskId }) {
  return (
    <div>
      <Background
        in={!!selectedTaskId}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <TransitionGroup>
        {tasks.map(
          (task) =>
            task._id === selectedTaskId && (
              <Task
                selected
                task={task}
                timeout={300}
                classNames="task-selected-transition"
                key={`selected ${task._id}`}
              />
            )
        )}
      </TransitionGroup>
    </div>
  );
}

export default TasksSelected;
