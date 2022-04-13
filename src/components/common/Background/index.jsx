import React from "react";

import withCSSTransition from "../../hoc/withCSSTransition";

import "./index.css";

function Background(props) {
  return <div className="background" {...props}></div>;
}

export default withCSSTransition(Background);
