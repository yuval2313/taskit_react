import React from "react";

import styles from "./index.module.scss";

function Separator({ className, hidden }) {
  return (
    <hr
      className={`${styles.separator} ${
        hidden ? styles.hidden : ""
      } ${className}`}
    />
  );
}

Separator.defaultProps = {
  className: "",
};

export default Separator;
