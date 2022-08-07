import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import DropdownItem from "components/DropdownItem";

import { useClickOutside } from "hooks/useClickOutside";
import { useLogout } from "hooks/useLogout";

import {
  faUserCircle,
  faCogs,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function SettingsMenu({ user }) {
  const [showSettings, setShowSettings] = useState(false);

  const menuRef = useClickOutside(() => setShowSettings(false));
  const logout = useLogout();

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
        <DropdownItem onClick={logout} leftIcon={faSignOutAlt}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </div>
  );
}

export default SettingsMenu;
