import React from "react";

import withHover from "../hoc/withHover";

import Icon from "../common/generic/Icon";
import Button from "../common/generic/Button";
import Hover from "../common/generic/Hover";

import { faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskLabel({ label, onDelete, hovering }) {
  return (
    <div key={label._id} className={styles.label}>
      <Icon className={styles.icon} icon={faTag} />
      {label.name}
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
          onClick={(e) => {
            e.stopPropagation();
            return onDelete(label._id, e);
          }}
        />
      </Hover>
    </div>
  );
}

export default withHover(TaskLabel);
