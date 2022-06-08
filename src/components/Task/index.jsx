import React from "react";
import TaskContext from "../context/TaskContext";

import { useDispatch } from "react-redux";
import {
  deleteTask,
  updateTaskProperty,
  saveTask,
} from "../../store/entities/tasks";

import { clearQuery, selectTask, deselectTask } from "../../store/ui/tasksPage";

import TaskMain from "../containers/TaskMain";
import TaskLabels from "../containers/TaskLabels";
import TaskInfo from "../containers/TaskInfo";
import TaskFooter from "../containers/TaskFooter";

import { useClickOutside } from "../../hooks/useClickOutside";
import withCSSTransition from "../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

const Task = ({ task, selected, forwardedRef }) => {
  const dispatch = useDispatch();

  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels,
    updatedAt,
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
      if (!title && !content && !status && !priority) handleDelete();
      else handleSave();
    }
    return dispatch(deselectTask());
  }

  return (
    <TaskContext.Provider
      value={{
        task: { ...task, selected },
        handlers: { handleChange, handleDelete, handleExit },
      }}
    >
      <article
        ref={forwardedRef}
        className={`
        ${styles.task} 
        ${selected ? styles.selected : ""}
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
