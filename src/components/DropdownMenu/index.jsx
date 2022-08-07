import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";

import styles from "./index.module.scss";
import "./transitions.scss";

function DropdownMenu({ className, children, forwardedRef }) {
  return (
    <ul
      ref={forwardedRef}
      className={`${styles.menu} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </ul>
  );
}

DropdownMenu.defaultProps = {
  className: "",
};

export default withCSSTransition(DropdownMenu);
