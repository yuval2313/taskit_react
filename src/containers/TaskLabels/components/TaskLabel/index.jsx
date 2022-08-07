import React from "react";

import withHover from "hoc/withHover";

import LabelName from "components/LabelName";
import Button from "components/Button";
import Hover from "components/Hover";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabel({ label, onDelete, hovering, selected }) {
  function handleRemove(e) {
    e.stopPropagation();
    return onDelete({ currentTarget: { name: "labels", value: label._id } });
  }

  return (
    <div
      key={label._id}
      className={`${styles.label} ${selected ? styles.selected : ""}`}
    >
      <span className={`${styles.name} ${hovering ? styles.hovering : ""}`}>
        <LabelName labelName={label.name} />
      </span>
      <Hover
        in={hovering}
        timeout={300}
        classNames="hover-transition"
        unmountOnExit
      >
        <Button
          className={styles.delete}
          icon={faTimes}
          tooltip="Remove"
          onClick={handleRemove}
        />
      </Hover>
    </div>
  );
}

export default withHover(TaskLabel);
