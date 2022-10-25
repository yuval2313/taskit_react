import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function withCSSTransition(Component) {
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
        timeout={timeout ? timeout : 0}
        classNames={classNames}
        unmountOnExit={unmountOnExit}
        onExited={onExited}
        enter={enter}
        exit={exit}
        nodeRef={nodeRef}
      >
        <Component forwardedRef={nodeRef} {...rest} />
      </CSSTransition>
    );
  };
}
