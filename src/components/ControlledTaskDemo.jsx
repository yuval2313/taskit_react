import React, { useContext } from "react";
import TasksContext from "../context/TasksContext";

import Button from "./common/Button";
import Status from "./Status";
import Priority from "./Priority";
import TaskTextarea from "./TaskTextarea";

import { getEdited } from "../utilities/dateUtils";
import { useDebounce } from "../hooks/useDebounce";
import { useClickOutside } from "../hooks/useClickOutside";

import { faTrashAlt, faBell } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faCompress } from "@fortawesome/free-solid-svg-icons";
import "../styles/Task.css";

function ControlledTaskDemo({ task = {}, selected }) {
  const { onChange, onSave, onDelete, onSelect, onExit, searchQuery } =
    useContext(TasksContext);

  const { createdAt, title, content, status, priority, updatedAt } = task;
  const taskRef = useClickOutside(handleExit);

  useDebounce(() => onSave(task), 5000, [status, priority]);

  function handleSave() {
    // if task is new should exit
    if (!createdAt) onExit();
    return onSave(task);
  }

  function handleDelete() {
    return onDelete(task);
  }

  function handleSelect() {
    return onSelect(task);
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

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const taskClone = { ...task };

    taskClone[name] = value;

    return onChange(taskClone);
  }

  return (
    <article
      ref={taskRef}
      className={`task ${selected ? selected : ""}`}
      onClick={selected ? handleSelect : null}
    >
      <div className={priority}>
        <div className="task-main">
          <div className="task-topbar float-right">
            {selected ? (
              <Button
                onClick={handleExit}
                className="btn-clear"
                icon={faCompress}
              />
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  return onDelete(task);
                }}
                className="btn-clear"
                icon={faTimes}
                tooltip="Delete Task"
              />
            )}
          </div>
          <div className="task-title">
            <TaskTextarea
              selected={selected}
              name="title"
              value={title}
              searchQuery={searchQuery}
              placeholder={"Title"}
              onChange={handleChange}
              rows={3}
              maxLength={100}
              autoFocus={!title}
            />
          </div>
          <hr className="separator" />
          <div className="task-content">
            <TaskTextarea
              selected={selected}
              name="content"
              value={content}
              searchQuery={searchQuery}
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
        {selected ? (
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
        ) : null}
      </div>
    </article>
  );
}

export default ControlledTaskDemo;
