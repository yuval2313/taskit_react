import React, { useEffect, useContext } from "react";

import TaskTextarea from "./TaskTextarea";
import Button from "./common/Button";
import Status from "./Status";

import { padTo2Digits, isToday, isYear } from "../utilities/dateUtils";

import { faTimes, faCompress } from "@fortawesome/free-solid-svg-icons";
import { faBell, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import TasksContext from "../context/TasksContext";

import "../styles/Task.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Task({ task, selected }) {
  const { tasks, setTasks, expanding, onExit, onSave, onDelete, onSelect } =
    useContext(TasksContext);

  useEffect(() => {});

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const index = tasks.indexOf(task);

    const tasksClone = [...tasks];
    tasksClone[index] = { ...task };
    tasksClone[index][name] = value;

    setTasks(tasksClone);
  }

  function getEdited() {
    let edited = "Edited: ";

    const { updatedAt } = task;
    if (!updatedAt) return null;

    const date = new Date(updatedAt);

    const year = date.getFullYear().toString();
    const month = padTo2Digits(date.getMonth() + 1);
    const day = padTo2Digits(date.getDate());
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());

    if (isToday(date)) return (edited += `${hours}:${minutes}`);
    if (isYear(date)) return (edited += `${day}/${month}`);
    return (edited += `${day}/${month}/${year}`);
  }

  // function focusContent(e) {
  //   e.preventDefault();
  //   const parentTask = e.currentTarget.offsetParent;
  //   const content = parentTask.querySelector("#content");
  //   content.focus();
  // }

  return (
    <article
      className={`task ${selected ? "selected" : ""} ${
        selected && expanding ? "expanding" : ""
      }`}
      onClick={selected ? null : () => onSelect(task._id)}
    >
      <div className="task-main">
        {selected ? (
          <Button
            onClick={onExit}
            className="btn-clear float-right"
            icon={faCompress}
          />
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              return onDelete(task);
            }}
            className="btn-clear float-right"
            icon={faTimes}
          />
        )}
        <div className="task-title">
          <TaskTextarea
            name="title"
            selected={selected}
            value={task.title}
            placeholder="Title"
            onChange={handleChange}
            maxLength={100}
          />
        </div>
        <hr className="separator" />
        <div className="task-content">
          <TaskTextarea
            name={"content"}
            selected={selected}
            value={task.content}
            placeholder="Empty..."
            onChange={handleChange}
            maxLength={500}
            minRows={15}
          />
        </div>
      </div>
      <div className="task-info">
        <div className="task-status">
          <Status task={task} onChange={handleChange} />
        </div>
        <span className="task-date">{getEdited()}</span>
      </div>
      {selected && (
        <div className="task-footer">
          <div className="footer-toolbar">
            <Button className="btn-clear" icon={faBell} />
            <Button
              className="btn-clear"
              icon={faTrashAlt}
              onClick={() => onDelete(task)}
            />
          </div>
          <Button
            className="btn btn-3d"
            onClick={() => onSave(task)}
            label={"Save"}
          />
        </div>
      )}
    </article>
  );
}

export default Task;
