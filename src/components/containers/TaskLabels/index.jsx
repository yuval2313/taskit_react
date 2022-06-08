import React, { useContext } from "react";
import TaskContext from "../../context/TaskContext";

import { useSelector } from "react-redux";
import { getLabelsByIds } from "../../../store/entities/labels";

import TaskLabel from "../../TaskLabel";
import TaskLabelsDropdown from "../TaskLabelsDropdown";

import styles from "./index.module.scss";

function TaskLabels() {
  const { task, handlers } = useContext(TaskContext);
  const { labels: labelIds } = task;
  const { handleChange } = handlers;

  const taskLabels = useSelector(getLabelsByIds(labelIds));

  function handleDelete(labelId, e) {
    const filteredLabelIds = labelIds.filter((id) => id !== labelId);
    return handleChange({
      ...e,
      currentTarget: { name: "labels", value: filteredLabelIds },
    });
  }

  return (
    <div className={styles.container}>
      {taskLabels.map((label) => (
        <TaskLabel key={label._id} label={label} onDelete={handleDelete} />
      ))}
      <TaskLabelsDropdown />
    </div>
  );
}

export default TaskLabels;
