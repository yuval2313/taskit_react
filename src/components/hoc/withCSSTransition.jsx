import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import withForwardRef from "./withForwardRef";

export default function withCSSTransition(Component) {
  const ComponentWithRef = withForwardRef(Component);

  return function WithCSSTransition({
    key,
    timeout,
    classNames,
    in: inCondition,
    unmountOnExit,
    onExited,
    enter,
    exit,
    ...rest
  }) {
    const nodeRef = useRef();

    return (
      <CSSTransition
        key={key}
        in={inCondition}
        timeout={timeout}
        classNames={classNames}
        unmountOnExit={unmountOnExit}
        onExited={onExited}
        enter={enter}
        exit={exit}
        nodeRef={nodeRef}
      >
        <ComponentWithRef ref={nodeRef} {...rest} />
      </CSSTransition>
    );
  };
}
