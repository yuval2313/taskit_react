import React, { useState, useContext, useEffect } from "react";
import TasksContext from "context/TasksContext";

import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { saveTask, getTaskById, setTasksSynced } from "store/entities/tasks";

import Task from "containers/Task";

import { useClickOutside } from "hooks/useClickOutside";
import { useDebounce } from "hooks/useDebounce";
import withCSSTransition from "hoc/withCSSTransition";

import "./transitions.scss";

function SelectedTask({ taskId, startingProperties, forwardedRef }) {
  const { handleDeselectTask } = useContext(TasksContext);
  const taskRef = useClickOutside(handleExit);

  const dispatch = useDispatch();
  const task = useSelector(getTaskById(taskId));

  const [data, setData] = useState(
    task
      ? { ...task }
      : {
          _id: taskId,
          title: "",
          content: "",
          status: "",
          priority: "",
          labels: [],
          ...startingProperties,
        }
  );

  const {
    title,
    content,
    status,
    priority,
    labels: labelIds,
    updatedAt,
  } = data;

  useDebounce(handleDebounceSave, 5000, [title, content]);

  useEffect(handleUpdated, [task]);

  function isEmpty() {
    return !title && !content && !status && !priority && !labelIds.length;
  }
  function isNew() {
    return task ? false : true;
  }
  function isEdited() {
    return !_.isEqual(task, data);
  }

  function handleSave(task) {
    return dispatch(saveTask(task));
  }

  function handleDebounceSave() {
    if (!isNew() && isEdited())
      return handleSave({ _id: taskId, title, content });
  }

  function handleUpdated() {
    if (task && task.updatedAt !== updatedAt)
      return setData({ ...data, updatedAt: task.updatedAt, _id: task._id });
  }

  function handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    if (name === "title" || name === "content") dispatch(setTasksSynced(false));

    return setData({ ...data, [name]: value });
  }

  function handleExit() {
    handleDeselectTask();
    if ((!isNew() && isEdited()) || (isNew() && !isEmpty()))
      return handleSave(data);
    else return dispatch(setTasksSynced(true));
  }

  return (
    <div ref={taskRef}>
      <Task
        selected
        task={data}
        isNew={isNew()}
        onChange={handleChange}
        onExit={handleExit}
        forwardedRef={forwardedRef}
      />
    </div>
  );
}

export default withCSSTransition(SelectedTask);
