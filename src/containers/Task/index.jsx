import React, { useContext } from "react";
import TasksContext from "context/TasksContext";

import { useDispatch } from "react-redux";
import { removeTask, saveTask } from "store/entities/tasks";

import TaskLabels from "containers/TaskLabels";
import TaskMain from "./components/TaskMain";
import TaskInfo from "./components/TaskInfo";
import TaskFooter from "./components/TaskFooter";

import withCSSTransition from "hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.scss";

const Task = ({
  task,
  selected,
  table,
  hidden,
  isNew,
  onChange,
  onExit,
  forwardedRef,
}) => {
  const { searchQuery, handleSelectTask, handleDeselectTask } =
    useContext(TasksContext);
  const dispatch = useDispatch();

  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels: labelIds,
    updatedAt,
  } = task;

  function handleUpdateChange({ currentTarget }) {
    const { name, value } = currentTarget;
    if (selected) onChange({ currentTarget });
    if (!isNew) return handleSave({ _id: taskId, [name]: value });
  }

  function handleSave(task) {
    return dispatch(saveTask(task));
  }
  function handleDelete() {
    if (selected) handleDeselectTask();
    return dispatch(removeTask(taskId));
  }

  return (
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
      <div className={priority ? styles[priority] : styles.prt_unset}>
        <TaskMain
          selected={selected}
          table={table}
          title={title}
          content={content}
          searchQuery={searchQuery}
          onChange={onChange}
          onDelete={handleDelete}
        />
        <TaskLabels
          selected={selected}
          table={table}
          labelIds={labelIds}
          onChange={handleUpdateChange}
          priority={priority}
        />
        <TaskInfo
          table={table}
          status={status}
          priority={priority}
          updatedAt={updatedAt}
          onChange={handleUpdateChange}
        />
        {selected && (
          <TaskFooter
            priority={priority}
            onExit={onExit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </article>
  );
};

export default withCSSTransition(Task);
