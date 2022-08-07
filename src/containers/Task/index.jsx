import React, { useState, useContext } from "react";
import TasksContext from "context/TasksContext";
import TaskContext from "context/TaskContext";

import { useDispatch } from "react-redux";
import { removeTask, updateTaskProperty, saveTask } from "store/entities/tasks";

import TaskLabels from "containers/TaskLabels";
import TaskMain from "./components/TaskMain";
import TaskInfo from "./components/TaskInfo";
import TaskFooter from "./components/TaskFooter";

import { useClickOutside } from "hooks/useClickOutside";
import { useDebounce } from "hooks/useDebounce";

import withCSSTransition from "hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.scss";

const Task = ({ task, selected, table, hidden, forwardedRef }) => {
  const { searchQuery, handleSelectTask, handleDeselectTask } =
    useContext(TasksContext);
  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels: labelIds,
    createdAt,
    updatedAt,
  } = task;

  // const [title, setTitle] = useState(task.title);
  // const [content, setContent] = useState(task.content);

  const dispatch = useDispatch();

  useDebounce(
    () => {
      console.log(
        `debouncing... | Selected: ${!!selected} | Table: ${!!table} | Hidden: ${!!hidden}`
      );
      if (createdAt && !hidden) {
        console.log(
          `saving... | Selected: ${!!selected} | Table: ${!!table} | Hidden: ${!!hidden}`
        );
        return handleSave();
      }
    },
    5000,
    [title, content, status, priority, labelIds.length]
    // [title, content]
  );
  const taskRef = useClickOutside(handleExit);

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    return dispatch(updateTaskProperty(taskId, name, value));
  }

  function handleSave() {
    return dispatch(saveTask(task));
  }

  function handleDelete() {
    if (selected) handleDeselectTask();
    return dispatch(removeTask(task));
  }

  function handleExit() {
    if (
      !createdAt &&
      !title &&
      !content &&
      !status &&
      !priority &&
      !labelIds.length
    )
      return handleDelete();
    handleSave();
    return handleDeselectTask();
  }

  return (
    <TaskContext.Provider value={{ selected, table }}>
      <article
        ref={forwardedRef}
        className={`
        ${styles.task} 
        ${selected ? styles.selected : ""}
        ${table ? styles.table : ""}
        ${hidden ? styles.hidden : ""}
      `}
        onClick={!selected ? () => handleSelectTask(taskId) : null}
      >
        <div
          ref={selected ? taskRef : undefined}
          className={priority ? styles[priority] : styles.prt_unset}
        >
          <TaskMain
            title={title}
            content={content}
            searchQuery={searchQuery}
            onChange={handleChange}
            onDelete={handleDelete}
          />
          <TaskLabels
            labelIds={labelIds}
            onChange={handleChange}
            priority={priority}
          />
          <TaskInfo
            status={status}
            priority={priority}
            updatedAt={updatedAt}
            onChange={handleChange}
          />
          {selected && (
            <TaskFooter onExit={handleExit} onDelete={handleDelete} />
          )}
        </div>
      </article>
    </TaskContext.Provider>
  );
};

export default withCSSTransition(Task);
