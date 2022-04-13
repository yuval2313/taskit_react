import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";

import Button from "../common/Button";
import DropdownMenu from "../common/DropdownMenu";
import DropdownItem from "../common/DropdownItem";

import { useClickOutside } from "../../hooks/useClickOutside";

import {
  faUserCircle,
  faCogs,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";

function SettingsMenu() {
  const [showSettings, setShowSettings] = useState(false);

  const user = useContext(UserContext);

  const menuRef = useClickOutside(() => setShowSettings(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowSettings(!showSettings);
  }

  return (
    <div ref={menuRef} className={"nav-item settings-menu dropdown"}>
      <Button
        onClick={handleToggleMenu}
        icon={faCog}
        className={`btn-clear ${showSettings ? "spin" : ""}`}
      />
      <DropdownMenu
        in={showSettings}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
      >
        <DropdownItem leftIcon={faUserCircle}>{user.name}</DropdownItem>
        <DropdownItem leftIcon={faCogs}>Settings</DropdownItem>
        <DropdownItem
          onClick={() => (window.location = "/logout")}
          leftIcon={faSignOutAlt}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
}

export default SettingsMenu;
