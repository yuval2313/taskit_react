import React from "react";
import { CSSTransition } from "react-transition-group";

export default function withCSSTransition(Component) {
  function WithCSSTransition({
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
      >
        <Component {...rest} />
      </CSSTransition>
    );
  }

  return WithCSSTransition;
}
