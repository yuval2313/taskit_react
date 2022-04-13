import React from "react";
import Icon from "../Icon";

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
      //FIXME: delete this attribute, let ...rest take care of it
      onClick={(e) => {
        e.stopPropagation();
        return onClick
          ? onClick({ ...e, currentTarget: { name, value } })
          : null;
      }}
      className={className + " menu-item"}
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
