import React from "react";

import Icon from "./Icon";
import withTooltip from "./../hoc/withTooltip";
import Tooltip from "./Tooltip";

import "../../styles/common/Button.css";

function Button({
  children,
  label,
  icon,
  leftIcon,
  rightIcon,
  className,
  showTooltip,
  tooltip,
  ...rest
}) {
  function renderIconButton() {
    return <Icon icon={icon} className="btn-icon" />;
  }

  function renderLabeledButton() {
    return (
      <span>
        {leftIcon && <Icon icon={leftIcon} className="btn-icon-left" />}
        {children || label}
        {rightIcon && <Icon icon={rightIcon} className="btn-icon-right" />}
      </span>
    );
  }

  return (
    <span>
      {showTooltip && tooltip && <Tooltip tooltip={tooltip} />}
      <button
        className={icon ? `btn btn-circle ${className}` : `btn ${className}`}
        {...rest}
      >
        {icon ? renderIconButton() : renderLabeledButton()}
      </button>
    </span>
  );
}

Button.defaultProps = {
  className: "btn",
};

export default withTooltip(Button);
