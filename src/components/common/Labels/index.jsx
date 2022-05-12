import React from "react";

import Button from "../generic/Button";
import Icon from "../generic/Icon";

import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function Labels({ labels: taskLabels }) {
  return (
    <div className={styles.container}>
      {taskLabels.map((label) => (
        <span key={label._id} className={styles.label}>
          <Icon className={styles.icon} icon={faTag} />
          {label.name}
        </span>
      ))}
      {/* TODO: Add dropdown with 'Add new label option' which turns into input field */}
      <Button className={styles.label} rightIcon={faTags} label="+" />
    </div>
  );
}

export default Labels;
