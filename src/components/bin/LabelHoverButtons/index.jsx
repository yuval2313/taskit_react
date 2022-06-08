import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";

import Button from "../../common/generic/Button";

import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import "./transitions.css";

function LabelHoverButtons({ onEdit, onDelete, forwardedRef }) {
  return (
    <div className={styles.container} ref={forwardedRef}>
      <Button icon={faPencilAlt} onClick={onEdit} tooltip="Edit" />
      <Button icon={faTimes} onClick={onDelete} tooltip="Delete" />
    </div>
  );
}

export default withCSSTransition(LabelHoverButtons);
