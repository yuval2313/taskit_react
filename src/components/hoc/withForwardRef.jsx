import React from "react";

export default function withForwardRef(Component) {
  return React.forwardRef((props, ref) => (
    <Component {...props} forwardedRef={ref} />
  ));
}
