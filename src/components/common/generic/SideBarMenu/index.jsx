import React from "react";

import styles from "./index.module.scss";

function SideBarMenu({ className, children }) {
  return <div className={`${styles.menu} ${className}`}>{children}</div>;
}

export default SideBarMenu;
