import React, { useContext } from "react";
import TaskContext from "../../context/TaskContext";

import Button from "../../common/generic/Button";

import { faBell, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.scss";

function TaskFooter() {
  const { handlers } = useContext(TaskContext);
  const { handleDelete, handleExit } = handlers;

  return (
    <div className={styles.footer}>
      <div className={styles.toolbar}>
        <Button icon={faBell} />
        <Button icon={faTrashAlt} onClick={handleDelete} />
      </div>
      <Button className={styles.btn_save} onClick={handleExit}>
        Close
      </Button>
    </div>
  );
}

export default TaskFooter;
