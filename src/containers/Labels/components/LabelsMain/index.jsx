import React from "react";
import { TransitionGroup } from "react-transition-group";

import { getFilteredLabels } from "helpers/labelsHelpers";

import Label from "components/Label";
import Separator from "components/Separator";
import SideBarItem from "components/SideBarItem";

import styles from "./index.module.scss";

function LabelsMain({
  labels,
  searchQuery,
  selectedLabelId,
  onSelectLabel,
  onDeselectLabel,
  onDeleteLabel,
  onUpdateLabel,
}) {
  function handleSelect(labelId) {
    return selectedLabelId === labelId
      ? onDeselectLabel()
      : onSelectLabel(labelId);
  }

  function getData() {
    return getFilteredLabels(labels, searchQuery);
  }

  return (
    <div className={styles.container}>
      <TransitionGroup>
        {getData().map((label) => (
          <SideBarItem
            key={label._id}
            timeout={400}
            classNames="sidebar-item-transition"
            onClick={() => handleSelect(label._id)}
            selected={selectedLabelId === label._id}
          >
            <Label
              label={label}
              onDelete={onDeleteLabel}
              onUpdate={onUpdateLabel}
            />
          </SideBarItem>
        ))}
      </TransitionGroup>
      <Separator className={styles.separator} />
    </div>
  );
}

export default LabelsMain;
