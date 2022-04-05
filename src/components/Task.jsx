import React, { useContext } from "react";

import TasksContext from "../context/TasksContext";

import Button from "./common/Button";
import Status from "./Status";
import Priority from "./Priority";
import Labels from "./Labels";
import HighlightSearch from "./common/HighlightSearch";

import { getEdited } from "../utilities/dateUtils";
import { useDebounce } from "../hooks/useDebounce";
import withCSSTransition from "./hoc/withCSSTransition";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/Task.css";

function Task({ task }) {
  const { onChange, onSave, onDelete, onSelect, searchQuery } =
    useContext(TasksContext);

  const { title, content, status, priority, labels, updatedAt } = task;

  useDebounce(() => onSave(task), 5000, [status, priority]);

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const taskClone = { ...task };

    taskClone[name] = value;

    return onChange(taskClone);
  }

  return (
    <article className="task" onClick={() => onSelect(task)}>
      <div className={priority}>
        <div className="task-main">
          <div className="task-topbar float-right">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                return onDelete(task);
              }}
              className="btn-clear"
              icon={faTimes}
              tooltip="Delete Task"
            />
          </div>
          <div className="task-title">
            <HighlightSearch
              searchQuery={searchQuery}
              value={title}
              placeholder="Title"
            />
          </div>
          <hr className="separator" />
          <div className="task-content">
            <HighlightSearch
              searchQuery={searchQuery}
              value={content}
              placeholder="Empty..."
            />
          </div>
        </div>
        <div className="task-labels">
          {/* TODO: Create labels component */}
          <Labels labels={labels} />
        </div>
        <div className="task-info">
          <div className="task-badges">
            <Status task={task} onChange={handleChange} />
            <Priority task={task} onChange={handleChange} />
          </div>
          <span className="task-date">{getEdited(updatedAt)}</span>
        </div>
      </div>
    </article>
  );
}

export default withCSSTransition(Task);
