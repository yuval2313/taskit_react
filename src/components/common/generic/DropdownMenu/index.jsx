import React from "react";

import withCSSTransition from "../../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

const DropdownMenu = ({ className, children, forwardedRef }) => (
  <ul
    ref={forwardedRef}
    className={`${styles.menu} ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </ul>
);
export default withCSSTransition(DropdownMenu);
