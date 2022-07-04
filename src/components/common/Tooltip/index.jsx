import React from "react";

import styles from "./index.module.scss";

function Tooltip({ tooltip }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {tooltip}
        <span className={styles.arrow}></span>
      </div>
    </div>
  );
}

export default Tooltip;
