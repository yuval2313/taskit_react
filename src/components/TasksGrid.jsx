import React, { useContext } from "react";
import Task from "./Task";
import TasksContext from "./../context/TasksContext";

function TasksGrid({ selectedTask, filteredTasks }) {
  const { onExit } = useContext(TasksContext);

  return (
    <div className="tasks-grid-container">
      <div
        className={`background ${selectedTask ? "selected" : "hidden"}`}
        onClick={onExit}
      ></div>
      <ul className="tasks-grid">
        {filteredTasks.map((task) => (
          <li className="grid-item" key={task._id}>
            {selectedTask && selectedTask._id === task._id ? (
              <Task task={task} selected={true} />
            ) : (
              <Task task={task} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksGrid;
