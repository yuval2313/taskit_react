import React from "react";

import styles from "./index.module.scss";

const Input = ({ name, error, ...rest }) => {
  return (
    <div className={styles.container}>
      <input {...rest} id={name} name={name} className={styles.input} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
