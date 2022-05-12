import React from "react";
import { NavLink } from "react-router-dom";

import Sync from "../../common/Sync";
import SettingsMenu from "../../common/SettingsMenu";

import styles from "./index.module.scss";

function NavBar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.items}>
        <li>
          <NavLink className={styles.brand} to="/">
            Task-it
          </NavLink>
        </li>
        <li className={styles.item}>
          <Sync />
        </li>
        <li className={styles.item}>
          <SettingsMenu />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
