import React from "react";
import Icon from "../Icon";

import styles from "./index.module.scss";

function DropdownItem({
  children,
  leftIcon,
  onClick,
  name,
  value,
  label,
  className,
  ...rest
}) {
  return (
    <li
      onClick={(e) => {
        return onClick
          ? onClick({ ...e, currentTarget: { name, value } })
          : null;
      }}
      className={className + " " + styles.menu_item}
      value={value}
      name={name}
      {...rest}
    >
      {leftIcon && <Icon className="icon" icon={leftIcon} />}
      {children || label}
    </li>
  );
}

export default DropdownItem;
