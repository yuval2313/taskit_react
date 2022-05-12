import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Lost?</h1>
      <h2>Sorry, can't find this page...</h2>
      <NavLink to="/" className={"btn"}>
        Home
      </NavLink>
      <p>
        Error Code -<span> 404</span>
      </p>
    </div>
  );
};

export default NotFound;
