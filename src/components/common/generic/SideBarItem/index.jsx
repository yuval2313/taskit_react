import React from "react";

import withCSSTransition from "../../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.css";

function SideBarItem({ children, forwardedRef, ...rest }) {
  return (
    <div ref={forwardedRef} className={styles.menu_item} {...rest}>
      {children}
    </div>
  );
}

export default withCSSTransition(SideBarItem);
