import React from "react";
import { NavLink } from "react-router-dom";

import SettingsMenu from "./SettingsMenu";

import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink className="nav-brand" to="/">
          Task-it
        </NavLink>
        <SettingsMenu />
      </div>
    </nav>
  );
}

export default NavBar;
