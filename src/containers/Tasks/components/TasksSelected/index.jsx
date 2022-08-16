import React from "react";

import Background from "components/Background";
import SelectedTask from "containers/SelectedTask";

function TasksSelected({ selectedTaskId, newTaskProperties }) {
  return (
    <div>
      <Background
        in={!!selectedTaskId}
        timeout={300}
        classNames="background-transition"
        unmountOnExit
      />
      <SelectedTask
        taskId={selectedTaskId}
        startingProperties={newTaskProperties}
        in={!!selectedTaskId}
        timeout={300}
        classNames="task-selected-transition"
        unmountOnExit
      />
    </div>
  );
}

export default TasksSelected;
