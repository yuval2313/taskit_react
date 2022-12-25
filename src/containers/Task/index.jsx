import React, { useContext } from "react";
import TasksContext from "context/TasksContext";

import { useDispatch, useSelector } from "react-redux";
import { removeTask, saveTask } from "store/entities/tasks";
import { getEventByTaskId, deleteEvent } from "store/entities/gcal";

import TaskLabels from "containers/TaskLabels";
import TaskMain from "./components/TaskMain";
import TaskInfo from "./components/TaskInfo";
import TaskFooter from "./components/TaskFooter";

import withCSSTransition from "hoc/withCSSTransition";
import colors from "constants/eventColors";

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
  const {
    _id: taskId,
    title,
    content,
    status,
    priority,
    labels: labelIds,
    updatedAt,
  } = task;

  const { searchQuery, handleSelectTask, handleDeselectTask } =
    useContext(TasksContext);
  const dispatch = useDispatch();
  const event = useSelector(getEventByTaskId(taskId));

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
    if (event) dispatch(deleteEvent(event.id));
    return dispatch(removeTask(taskId));
  }

  async function mapToEvent(start, end, reminders) {
    let data;
    if (isNew) {
      data = await handleSave(task).unwrap();
      handleSelectTask(data._id);
    }

    return {
      summary: title,
      description: content,
      colorId: colors.find((c) => c.priority === priority).colorId,
      start,
      end,
      reminders,
      taskId: isNew ? data._id : taskId,
    };
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
          event={event}
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
            mapToEvent={mapToEvent}
            event={event}
            onExit={onExit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </article>
  );
};

export default withCSSTransition(Task);
