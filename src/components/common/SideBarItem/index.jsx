import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

function SideBarItem({ children, selected, forwardedRef, ...rest }) {
  return (
    <div
      ref={forwardedRef}
      className={`${styles.menu_item} ${selected ? styles.selected : null}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default withCSSTransition(SideBarItem);
