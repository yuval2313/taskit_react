import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getLabelsByIds,
  getLabelsExceptIds,
  createLabel,
} from "store/entities/labels";

import TaskLabel from "./components/TaskLabel";
import TaskLabelsCounter from "./components/TaskLabelsCounter";
import TaskAddLabels from "./components/TaskAddLabels";

import styles from "./index.module.scss";

function TaskLabels({ labelIds, onChange, priority, selected, table }) {
  const dispatch = useDispatch();
  const taskLabels = useSelector(getLabelsByIds(labelIds));
  const remainingLabels = useSelector(getLabelsExceptIds(labelIds));

  function handleDelete({ currentTarget }) {
    const { value: labelId } = currentTarget;

    const filteredLabelIds = labelIds.filter((id) => id !== labelId);
    currentTarget.value = filteredLabelIds;

    return onChange({ currentTarget });
  }

  function handleAddLabel({ currentTarget }) {
    const { value: labelId } = currentTarget;

    const taskLabelIds = [...labelIds, labelId];
    currentTarget.value = taskLabelIds;

    return onChange({ currentTarget });
  }

  function handleCreateLabel(label) {
    return dispatch(createLabel(label));
  }

  const displayCount = 2;
  function renderLabels(label, i) {
    const component = (
      <TaskLabel
        key={label._id}
        selected={selected}
        label={label}
        onDelete={handleDelete}
      />
    );
    if (selected) return component;
    else if (i < displayCount) return component;
  }

  return (
    <div className={`${styles.container} ${table ? styles.table : ""}`}>
      {taskLabels.map(renderLabels)}
      {!selected && (
        <TaskLabelsCounter
          labelsCount={taskLabels.length}
          displayCount={displayCount}
        />
      )}
      {taskLabels.length < 50 && (
        <TaskAddLabels
          labels={remainingLabels}
          onAddLabel={handleAddLabel}
          onLabelCreate={handleCreateLabel}
          priorityStyle={priority}
        />
      )}
    </div>
  );
}

export default TaskLabels;
