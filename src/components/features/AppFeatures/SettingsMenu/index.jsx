import React, { useState } from "react";

import { useSelector } from "react-redux";
import { getUser } from "../../../../store/auth";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import DropdownItem from "../../../common/DropdownItem";

import { useClickOutside } from "../../../../hooks/useClickOutside";

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

  function handleToggleMenu() {
    return setShowSettings(!showSettings);
  }

  return (
    <div ref={menuRef} className={styles.container}>
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
