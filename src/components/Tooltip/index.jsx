import React from "react";

import styles from "./index.module.scss";

function Tooltip({ tooltip, bottom }) {
  return (
    <div className={styles.container}>
      <div className={`${bottom ? styles.box_bottom : styles.box_top}`}>
        {tooltip}
        <span className={styles.arrow}></span>
      </div>
    </div>
  );
}

export default Tooltip;
