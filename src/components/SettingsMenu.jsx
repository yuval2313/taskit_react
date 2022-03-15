import React, { useState, useContext } from "react";
import "../styles/SettingsMenu.css";
import UserContext from "../context/UserContext";

import Dropdown from "./common/Dropdown";

import {
  faUserCircle,
  faCogs,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function SettingsMenu() {
  const [showSettings, setShowsettings] = useState(false);

  const user = useContext(UserContext);

  const menuItems = [
    { label: user.name, leftIcon: faUserCircle, value: "user" },
    { label: "Settings", leftIcon: faCogs, value: "settings" },
    {
      label: "Log out",
      leftIcon: faSignOutAlt,
      value: "logout",
      handler: () => (window.location = "/logout"),
    },
  ];

  return (
    <div>
      <Dropdown
        showMenu={showSettings}
        setShowMenu={setShowsettings}
        closeOnSelect={false}
        options={menuItems}
        icon={faCog}
        className="nav-item settings-menu"
        buttonClassName={`btn-clear ${showSettings ? "spin" : ""}`}
      />
    </div>
  );
}

export default SettingsMenu;
