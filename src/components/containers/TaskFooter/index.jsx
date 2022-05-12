import React from "react";

import Button from "../../common/generic/Button";

import { faBell, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskFooter({ onDelete, onExit }) {
  return (
    <div className={styles.footer}>
      <div className={styles.toolbar}>
        <Button icon={faBell} />
        <Button icon={faTrashAlt} onClick={onDelete} />
      </div>
      <Button className={styles.btn_save} onClick={onExit}>
        Close
      </Button>
    </div>
  );
}

export default TaskFooter;
