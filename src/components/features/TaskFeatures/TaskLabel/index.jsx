import React, { useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import withHover from "../../../hoc/withHover";

import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import Hover from "../../../common/Hover";

import { faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabel({ label, onDelete, hovering }) {
  const { task } = useContext(TaskContext);
  const { selected } = task;
  function handleRemove(e) {
    e.stopPropagation();
    return onDelete(label._id, e);
  }

  return (
    <div
      key={label._id}
      className={`${styles.label} ${selected ? styles.selected : ""}`}
    >
      <Icon className={styles.icon} icon={faTag} />
      <span className={styles.name}>{label.name}</span>
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
          onClick={(e) => handleRemove(e)}
        />
      </Hover>
    </div>
  );
}

export default withHover(TaskLabel);
