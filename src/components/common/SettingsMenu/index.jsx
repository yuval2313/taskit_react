import React, { useState } from "react";

import { useSelector } from "react-redux";
import { getUser } from "../../../store/auth";

import Button from "../generic/Button";
import DropdownMenu from "../generic/DropdownMenu";
import DropdownItem from "../generic/DropdownItem";

import { useClickOutside } from "../../../hooks/useClickOutside";

import {
  faUserCircle,
  faCogs,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

function SettingsMenu() {
  const [showSettings, setShowSettings] = useState(false);

  const user = useSelector(getUser);

  const menuRef = useClickOutside(() => setShowSettings(false));

  function handleToggleMenu(e) {
    e.stopPropagation();
    return setShowSettings(!showSettings);
  }

  return (
    <div ref={menuRef} className={styles.settings_dropdown}>
      <Button
        onClick={handleToggleMenu}
        icon={faCog}
        className={`${showSettings ? styles.spin : ""}`}
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
