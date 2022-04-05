import React from "react";

import withCSSTransition from "../hoc/withCSSTransition";

function DropdownMenu({ children, className }) {
  return <ul className={"dropdown-menu " + className}>{children}</ul>;
}

export default withCSSTransition(DropdownMenu);
