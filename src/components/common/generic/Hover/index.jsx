import React from "react";

import withCSSTransition from "../../../hoc/withCSSTransition";
import "./transitions.css";

function Hover({ children, className, forwardedRef }) {
  return (
    <div ref={forwardedRef} className={className}>
      {children}
    </div>
  );
}

export default withCSSTransition(Hover);
