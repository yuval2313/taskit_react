import React from "react";

import styles from "./index.module.scss";

function Input({ name, error, className, ...rest }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <input {...rest} id={name} name={name} className={styles.input} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

Input.defaultProps = {
  className: "",
};

export default Input;
