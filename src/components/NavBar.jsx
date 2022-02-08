import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar(props) {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink className="nav-brand" to="/">
          Task-it
        </NavLink>

        <NavLink className="nav-item nav-end" to="/logout">
          Log out
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
