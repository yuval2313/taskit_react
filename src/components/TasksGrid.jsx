import React, { useContext } from "react";
import Task from "./Task";
import TasksContext from "./../context/TasksContext";

function TasksGrid({ selectedTask, handleExit, handleSave, handleExpand }) {
  const { filteredTasks, setTasks } = useContext(TasksContext);

  return (
    <div className="tasks-grid-container">
      <div
        className={`background ${selectedTask ? "selected" : "hidden"}`}
        onClick={handleExit}
      ></div>
      <ul className="tasks-grid">
        {filteredTasks.map((task) => (
          <li key={task._id}>
            {selectedTask && selectedTask._id === task._id ? (
              <Task
                task={task}
                selected={true}
                onSave={handleSave}
                setTasks={setTasks}
                onExit={handleExit}
              />
            ) : (
              <Task
                task={task}
                onSave={handleSave}
                setTasks={setTasks}
                onExpand={handleExpand}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksGrid;
