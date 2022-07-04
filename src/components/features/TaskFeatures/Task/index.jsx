import React from "react";
import TaskContext from "../../../context/TaskContext";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  updateTaskProperty,
  saveTask,
} from "../../../../store/entities/tasks";
import {
  clearQuery,
  selectTask,
  deselectTask,
  getView,
} from "../../../../store/ui/tasksPage";

import TaskMain from "../TaskMain";
import TaskLabels from "../TaskLabels";
import TaskInfo from "../TaskInfo";
import TaskFooter from "../TaskFooter";

import { useClickOutside } from "../../../../hooks/useClickOutside";
import withCSSTransition from "../../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

const Task = ({ task, selected, table, forwardedRef }) => {
  const dispatch = useDispatch();
  const view = useSelector(getView);

  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels,
    createdAt,
  } = task;

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
    return dispatch(deleteTask(task));
  }

  function handleSelect(taskId) {
    dispatch(clearQuery());
    dispatch(selectTask(taskId));
  }

  function handleExit() {
    if (!createdAt) {
      if (!title && !content && !status && !priority && !labels.length)
        handleDelete();
      else handleSave();
    }
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
