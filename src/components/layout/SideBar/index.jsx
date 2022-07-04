import React, { useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

import Button from "../../common/Button";
import Icon from "../../common/Icon";
import SideBarMenu from "../../common/SideBarMenu";
import Labels from "../../features/LabelsFeatures/Labels";

import { faBars, faStream, faTags } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function SideBar() {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useClickOutside(() => setShowMenu(false));

  function handleToggleMenu() {
    return setShowMenu(!showMenu);
  }

  return (
    <div ref={menuRef} className={styles.sidebar}>
      <div className={`${styles.toggler} ${showMenu ? styles.active : ""}`}>
        <span className={styles.toggler_label}>
          <Icon icon={faTags} />
          {" Labels"}
        </span>
        <Button
          className={styles.toggler_button}
          icon={showMenu ? faStream : faBars}
          onClick={handleToggleMenu}
        />
      </div>
      <SideBarMenu
        className={`${styles.menu} ${showMenu ? styles.active : ""}`}
      >
        <Labels />
      </SideBarMenu>
    </div>
  );
}

export default SideBar;
