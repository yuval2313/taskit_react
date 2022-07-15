import React from "react";
import TaskContext from "../../../context/TaskContext";

import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTaskProperty,
  saveTask,
} from "../../../../store/entities/tasks";
import {
  clearQuery,
  selectTask,
  deselectTask,
} from "../../../../store/ui/tasksPage";

import TaskMain from "../TaskMain";
import TaskLabels from "../TaskLabels";
import TaskInfo from "../TaskInfo";
import TaskFooter from "../TaskFooter";

import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useDebounce } from "../../../../hooks/useDebounce";

import withCSSTransition from "../../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

const Task = ({ task, selected, table, forwardedRef }) => {
  const dispatch = useDispatch();

  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels,
    createdAt,
  } = task;

  useDebounce(handleSave, 5000, [
    title,
    content,
    status,
    priority,
    labels.length,
  ]);
  const taskRef = useClickOutside(handleExit);

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    dispatch(updateTaskProperty(taskId, name, value));
  }

  function handleSave() {
    dispatch(saveTask(task));
  }

  function handleDelete() {
    if (selected) dispatch(deselectTask());
    return dispatch(removeTask(task));
  }

  function handleSelect(taskId) {
    dispatch(clearQuery());
    dispatch(selectTask(taskId));
  }

  function handleExit() {
    if (
      !createdAt &&
      !title &&
      !content &&
      !status &&
      !priority &&
      !labels.length
    )
      return handleDelete();
    handleSave();
    return dispatch(deselectTask());
  }

  return (
    <TaskContext.Provider
      value={{
        task: { ...task, selected, table },
        handlers: { handleChange, handleDelete, handleExit },
      }}
    >
      <article
        ref={forwardedRef}
        className={`
        ${styles.task} 
        ${selected ? styles.selected : ""}
        ${table ? styles.table : ""}
      `}
        onClick={!selected ? () => handleSelect(taskId) : null}
      >
        <div
          ref={selected ? taskRef : undefined}
          className={priority ? styles[priority] : styles.prt_unset}
        >
          <TaskMain />
          <TaskLabels />
          <TaskInfo />
          {selected && <TaskFooter />}
        </div>
      </article>
    </TaskContext.Provider>
  );
};

export default withCSSTransition(Task);
