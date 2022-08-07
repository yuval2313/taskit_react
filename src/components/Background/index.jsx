import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.scss";

const Background = ({ forwardedRef }) => (
  <div ref={forwardedRef} className={styles.background}></div>
);

export default withCSSTransition(Background);
