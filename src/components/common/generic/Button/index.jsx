import React from "react";

import Icon from "../Icon";
import Tooltip from "../Tooltip";
import withTooltip from "../../../hoc/withTooltip";

import styles from "./index.module.scss";

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
    return <Icon icon={icon} className={styles.icon} />;
  }

  function renderLabeledButton() {
    return (
      <span>
        {leftIcon && <Icon icon={leftIcon} className={styles.icon_left} />}
        {children || label}
        {rightIcon && <Icon icon={rightIcon} className={styles.icon_right} />}
      </span>
    );
  }

  return (
    <span>
      {showTooltip && tooltip && <Tooltip tooltip={tooltip} />}
      <button
        className={`${icon ? styles.btn_circle : styles.btn} ${className}`}
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
