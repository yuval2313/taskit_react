import React, { useEffect, useContext } from "react";

import TextArea from "./common/TextArea";
import Button from "./common/Button";

import { faTimes, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import TasksContext from "../context/TasksContext";

import "../styles/Task.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Task({ task, selected, onExpand, onExit, onSave }) {
  const { tasks, setTasks, searchQuery } = useContext(TasksContext);

  useEffect(() => {});

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const index = tasks.indexOf(task);

    const tasksClone = [...tasks];
    tasksClone[index] = { ...task };
    tasksClone[index][name] = value;

    setTasks(tasksClone);
  }

  //FIXME: REFACTOR
  function getEdited() {
    const { updatedAt } = task;
    if (!updatedAt) return null;

    const date = new Date(updatedAt);

    const year = date.getFullYear().toString();
    const month = padTo2Digits(date.getMonth() + 1);
    const day = padTo2Digits(date.getDate());
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());

    if (isToday(date)) return `${hours}:${minutes}`;
    if (isYear(date)) return `${day}/${month}`;
    return `${day}/${month}/${year}`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function isYear(date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
  }

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function focusContent(e) {
    e.preventDefault();
    const parentTask = e.currentTarget.offsetParent;
    const content = parentTask.querySelector("#content");
    content.focus();
  }

  return (
    <article
      className={`task ${selected ? "selected" : ""}`}
      onClick={selected ? null : () => onExpand(task._id)}
    >
      {/* <div className="task-topbar">
        {selected ? (
          <Button onClick={onExit} className="btn-circle-sm" icon={faTimes} />
        ) : (
          <Button
            onClick={() => onExpand(task._id)}
            className="btn-circle-sm rotated"
            icon={faExpandAlt}
          />
        )}
      </div> */}
      <div className="task-main">
        {!selected ? (
          <Button
            onClick={onExit}
            className="btn-circle-sm float-right"
            icon={faTimes}
          />
        ) : null}
        <TextArea
          name="title"
          selected={selected}
          value={task.title}
          placeholder="Title"
          onChange={handleChange}
          // onKeyPress={(e) => {
          //   if (e.key === "Enter") focusContent(e);
          // }}
          maxLength={100}
        />
        <hr className="separator" />
        <TextArea
          name={"content"}
          selected={selected}
          value={task.content}
          onChange={handleChange}
          maxLength={500}
          minRows={15}
          maxRows={20}
        />
      </div>
      <div className="task-date">Edited: {getEdited()}</div>
      {selected ? (
        <div className="task-footer">
          <Button className="btn-bg" icon={faBell} />
          <Button
            className="btn btn-3d"
            onClick={() => onSave(task)}
            label={"Save"}
          />
        </div>
      ) : null}
    </article>
  );
}

export default Task;
