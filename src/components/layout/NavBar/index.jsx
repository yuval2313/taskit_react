import React from "react";
import { NavLink } from "react-router-dom";

import SideBar from "../SideBar";
import Sync from "../../common/Sync";
import SettingsMenu from "../../common/SettingsMenu";

import styles from "./index.module.scss";

function NavBar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.nav_items}>
        <li className={styles.item}>
          <SideBar />
        </li>
        <li>
          <NavLink className={styles.brand} to="/">
            Task-it
          </NavLink>
        </li>
        <li className={styles.items_right}>
          <div className={styles.item}>
            <Sync />
          </div>
          <div className={styles.item}>
            <SettingsMenu />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
