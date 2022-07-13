import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchReminders } from "../../../../store/entities/reminders";

import Button from "../../../common/Button";
import DropdownMenu from "../../../common/DropdownMenu";
import Reminders from "../Reminders";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function RemindersMenu(props) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useClickOutside(() => setShowMenu(false));

  useEffect(() => {
    populateReminders();
  }, []);

  async function populateReminders() {
    try {
      await dispatch(fetchReminders()).unrwap();
    } catch (ex) {
      const { status } = ex;
      if (status === (400 || 401)) {
        window.location = "/logout";
      }
    }
  }

  function handleToggleMenu() {
    return setShowMenu(!showMenu);
  }

  return (
    <div ref={menuRef} className={styles.container}>
      <Button icon={faBell} onClick={handleToggleMenu} />
      <DropdownMenu
        in={showMenu}
        timeout={500}
        classNames="menu-transition"
        unmountOnExit
      >
        <Reminders />
      </DropdownMenu>
    </div>
  );
}

export default RemindersMenu;
