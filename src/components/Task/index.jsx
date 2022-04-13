import React, { useContext } from "react";

import TasksContext from "../../context/TasksContext";

import Button from "../common/Button";
import Status from "../Status";
import Priority from "../Priority";
import Labels from "../Labels";
import TaskTextarea from "../TaskTextarea";

import { getEdited } from "../../helpers/dateHelpers";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";
import withCSSTransition from "../hoc/withCSSTransition";

import { faTimes, faCompress } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faBell } from "@fortawesome/free-regular-svg-icons";

import "./index.css";

function Task({ task, selected }) {
  const { onChange, onSave, onDelete, onSelect, onExit, searchQuery } =
    useContext(TasksContext);

  const { title, content, status, priority, labels, updatedAt, createdAt } =
    task;

  useDebounce(() => onSave(task), 5000, [
    status,
    priority,
    title,
    content,
    // labels, FIXME: causes saving loop, probably because of embedded label objects always considered new
  ]);
  const taskRef = useClickOutside(handleExit);

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const taskClone = { ...task };

    taskClone[name] = value;

    return onChange(taskClone);
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
    if (!createdAt && !title && !content && !status && !priority)
      return handleDelete();
    //save + reinsert into tasks
    await handleSave();
    return onExit();
  }

  return (
    <article
      ref={selected ? taskRef : undefined}
      className={`task ${selected ? "selected" : ""}`}
      onClick={!selected ? () => onSelect(task._id) : null}
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
              searchQuery={searchQuery}
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
            <TaskTextarea
              selected={selected}
              searchQuery={searchQuery}
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
        <div className="task-labels">
          {/* TODO: Create labels component */}
          <Labels labels={labels} />
        </div>
        <div className="task-info">
          <div className="task-badges">
            <Status
              status={status}
              priority={priority}
              onChange={handleChange}
            />
            <Priority priority={priority} onChange={handleChange} />
          </div>
          <span className="task-date">{getEdited(updatedAt)}</span>
        </div>
        {selected && (
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
        )}
      </div>
    </article>
  );
}

export default withCSSTransition(Task);
