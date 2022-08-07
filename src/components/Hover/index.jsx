import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";
import "./transitions.scss";

function Hover({ children, className, forwardedRef }) {
  return (
    <div ref={forwardedRef} className={className}>
      {children}
    </div>
  );
}

Hover.defaultProps = {
  className: "",
};

export default withCSSTransition(Hover);
