import React, { useState, useContext, useEffect } from "react";
import TasksContext from "../context/TasksContext";

import Button from "./common/Button";
import TextArea from "./common/TextArea";
import Status from "./Status";
import Priority from "./Priority";

import { getEdited } from "../utilities/dateUtils";
import { useDebounce } from "../hooks/useDebounce";
import { useClickOutside } from "../hooks/useClickOutside";
import withCSSTransition from "./hoc/withCSSTransition";

import { faTrashAlt, faBell } from "@fortawesome/free-regular-svg-icons";
import { faCompress } from "@fortawesome/free-solid-svg-icons";

import "../styles/Task.css";
import "../styles/common/TextArea.css";

function SelectedTask({ selectedTask }) {
  const [task, setTask] = useState({ ...selectedTask });

  const { onExit, onSave, onDelete } = useContext(TasksContext);
  const taskRef = useClickOutside(handleExit);

  const { createdAt, updatedAt, title, content, status, priority } = task;

  useEffect(() => {
    populateTask();
  }, [selectedTask]);

  useDebounce(
    () => {
      if (createdAt) return handleSave();
    },
    5000,
    [title, content, status, priority]
  );

  function populateTask() {
    setTask({ ...selectedTask });
  }

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;

    const taskClone = { ...task };
    taskClone[name] = value;

    setTask(taskClone);
  }

  function handleSave() {
    // if task is new should exit
    if (!createdAt) onExit();
    return onSave(task);
  }

  function handleDelete() {
    return onDelete(task);
  }

  async function handleExit() {
    // if new task and empty - discard
    const { createdAt, title, content, status, priority } = task;
    if (!createdAt && !title && !content && !status && !priority)
      return handleDelete();
    //save + reinsert into tasks
    await handleSave();
    return onExit();
  }

  return (
    <article ref={taskRef} className={`task selected`}>
      <div className={priority}>
        <div className="task-main">
          <div className="task-topbar float-right">
            <Button
              onClick={handleExit}
              className="btn-clear"
              icon={faCompress}
            />
          </div>
          <div className="task-title">
            <TextArea
              name={"title"}
              value={title}
              placeholder={"Title"}
              onChange={handleChange}
              rows={3}
              maxLength={100}
              autoFocus={!title}
            />
          </div>
          <hr className="separator" />
          <div className="task-content">
            <TextArea
              name={"content"}
              value={content}
              placeholder={"Empty..."}
              onChange={handleChange}
              maxLength={5000}
              minRows={15}
              autoFocus={title && !content}
            />
          </div>
        </div>
        <div className="task-info">
          <div className="task-badges">
            <Status task={task} onChange={handleChange} />
            <Priority task={task} onChange={handleChange} />
          </div>
          <span className="task-date">{getEdited(updatedAt)}</span>
        </div>
        <div className="task-footer">
          <div className="footer-toolbar">
            <Button className="btn-clear" icon={faBell} />
            <Button
              className="btn-clear"
              icon={faTrashAlt}
              onClick={handleDelete}
            />
          </div>
          <Button
            className="btn-clear btn-3d"
            onClick={handleSave}
            label={"Save"}
          />
        </div>
      </div>
    </article>
  );
}

export default withCSSTransition(SelectedTask);
