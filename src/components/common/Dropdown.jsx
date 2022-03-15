import React from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

import DropdownMenu from "./DropdownMenu";
import DropdownItem from "./DropdownItem";
import Button from "./Button";

import "../../styles/common/Dropdown.css";

function Dropdown({
  onChange,
  showMenu,
  setShowMenu,
  closeOnSelect,
  name,
  options,
  selectedOption,
  placeholder,
  icon,
  className,
  buttonClassName,
}) {
  const menuRef = useClickOutside(() =>
    setShowMenu ? setShowMenu(false) : null
  );

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowMenu(!showMenu);
  }

  function handleSelectOption(e) {
    if (closeOnSelect) setShowMenu(false);
    return onChange ? onChange(e) : null;
  }

  function getLabel() {
    return options.filter((option) => option.value === selectedOption)[0].label;
  }

  //Options -> Array: [{ label: '', leftIcon: *icon*, value: '' , handler: () => {}}, ...]

  return (
    <div ref={menuRef} className={className + " dropdown"}>
      <Button
        onClick={handleToggleMenu}
        label={`${selectedOption ? getLabel() : placeholder}`}
        icon={!selectedOption && !placeholder ? icon : null}
        rightIcon={selectedOption || placeholder ? icon : null}
        className={`${buttonClassName} ${selectedOption}`}
      />
      {showMenu && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              onClick={(e) => {
                if (option.handler) option.handler();
                return handleSelectOption(e);
              }}
              name={name}
              key={option.value}
              value={option.value}
              className={option.value}
              leftIcon={option.leftIcon}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

Dropdown.defaultProps = {
  closeOnSelect: true,
  placeholder: "",
};

export default Dropdown;
