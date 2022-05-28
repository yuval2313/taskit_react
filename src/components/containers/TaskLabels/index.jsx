import React from "react";

import { useSelector } from "react-redux";

import Button from "../../common/generic/Button";
import Icon from "../../common/generic/Icon";

import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function TaskLabels({ labels: taskLabels }) {
  return (
    <div className={styles.container}>
      {/* {labels.map((label) => (
        <span key={label._id} className={styles.label}>
          <Icon className={styles.icon} icon={faTag} />
          {label.name}
        </span>
      ))} */}
      {/* TODO: Add dropdown with 'Add new label option' which turns into input field */}
      <Button className={styles.label} rightIcon={faTags} label="+" />
    </div>
  );
}

export default TaskLabels;
