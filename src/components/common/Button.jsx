import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/common/Button.css";

function Button({
  children,
  label,
  icon,
  leftIcon,
  rightIcon,
  className,
  ...rest
}) {
  function renderIconButton() {
    return (
      <span className={"btn-icon"}>
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  }

  function renderLabeledButton() {
    return (
      <span>
        {leftIcon && (
          <span className={"btn-icon-left"}>
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}
        {children || label}
        {rightIcon && (
          <span className={"btn-icon-right"}>
            <FontAwesomeIcon icon={rightIcon} />
          </span>
        )}
      </span>
    );
  }

  return (
    <button
      className={icon ? `btn btn-circle ${className}` : `btn ${className}`}
      {...rest}
    >
      {icon ? renderIconButton() : renderLabeledButton()}
    </button>
  );
}

Button.defaultProps = {
  className: "btn",
};

export default Button;
