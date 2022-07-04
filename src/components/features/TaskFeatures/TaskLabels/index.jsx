import React, { useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import { useSelector, useDispatch } from "react-redux";
import { getLabelsByIds } from "../../../../store/entities/labels";
import {
  getSelectedLabelId,
  deselectLabel,
} from "../../../../store/ui/labelsSideBar";
import { getSelectedTaskId } from "../../../../store/ui/tasksPage";

import TaskLabel from "../TaskLabel";
import TaskLabelsCounter from "../TaskLabelsCounter";
import TaskAddLabels from "../TaskAddLabels";

import styles from "./index.module.scss";

function TaskLabels() {
  const { task, handlers } = useContext(TaskContext);
  const { labels: labelIds, _id: taskId, selected } = task;
  const { handleChange } = handlers;

  const dispatch = useDispatch();
  const taskLabels = useSelector(getLabelsByIds(labelIds));
  const selectedLabelId = useSelector(getSelectedLabelId);
  const selectedTaskId = useSelector(getSelectedTaskId);

  function handleDelete(labelId, e) {
    if (selectedTaskId === taskId && selectedLabelId === labelId)
      dispatch(deselectLabel());

    const filteredLabelIds = labelIds.filter((id) => id !== labelId);
    return handleChange({
      ...e,
      currentTarget: { name: "labels", value: filteredLabelIds },
    });
  }

  const displayCount = 2;
  function displayLabels(label, i) {
    const component = (
      <TaskLabel key={label._id} label={label} onDelete={handleDelete} />
    );
    if (selected) return component;
    else if (i < displayCount) return component;
  }

  return (
    <div className={styles.container}>
      {taskLabels.map(displayLabels)}
      <TaskLabelsCounter
        selected={selected}
        labelsCount={taskLabels.length}
        displayCount={displayCount}
      />
      {taskLabels.length < 50 && <TaskAddLabels />}
    </div>
  );
}

export default TaskLabels;
