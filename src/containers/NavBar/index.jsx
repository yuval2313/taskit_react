import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getUser, fetchUser } from "store/auth";
import { isSynced as isTasksSynced } from "store/entities/tasks";
import { isSynced as isLabelsSynced } from "store/entities/labels";

import SideBar from "./components/SideBar";
import Sync from "./components/Sync";
import ProfileMenu from "./components/ProfileMenu";

import { useLogout } from "hooks/useLogout";

import styles from "./index.module.scss";

function NavBar() {
  const user = useSelector(getUser);
  const tasksSynced = useSelector(isTasksSynced);
  const labelsSynced = useSelector(isLabelsSynced);

  const dispatch = useDispatch();
  const logout = useLogout();

  useEffect(() => {
    populateUser();
  }, []);

  async function populateUser() {
    try {
      await dispatch(fetchUser()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === 400 || status === 401) {
        return logout();
      }
    }
  }

  function isDataSynced() {
    return tasksSynced && labelsSynced;
  }

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
            <Sync synced={isDataSynced()} />
          </div>
          <div className={styles.item}>
            <ProfileMenu user={user} />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
