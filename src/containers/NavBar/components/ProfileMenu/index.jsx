import React, { useState } from "react";

import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";

import { useClickOutside } from "hooks/useClickOutside";
import { useLogout } from "hooks/useLogout";
import { getJoined } from "helpers/dateHelpers";

import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function ProfileMenu({ user }) {
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
        icon={faUserCircle}
        className={`${showSettings ? styles.spin : ""}`}
      />
      <DropdownMenu
        in={showSettings}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
      >
        <div className={styles.profile}>
          <div className={styles.top}>
            <Button
              className={styles.logout}
              icon={faSignOutAlt}
              onClick={logout}
              tooltip="Sign out"
            />
          </div>
          <div className={styles.bottom}>
            <span className={styles.picture}>
              <img
                src={user.picture}
                alt="Your profile"
                referrerPolicy="same-origin"
              />
            </span>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.email}>{user.email}</span>
            {user.createdAt && (
              <span className={styles.joined}>{getJoined(user.createdAt)}</span>
            )}
          </div>
        </div>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;
