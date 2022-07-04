import React from "react";

import withForwardRef from "../../hoc/withForwardRef";

import styles from "./index.module.scss";

function Input({ name, error, className, forwardedRef, ...rest }) {
  return (
    <div className={`${styles.container} ${className}`} ref={forwardedRef}>
      <input {...rest} id={name} name={name} className={styles.input} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

Input.defaultProps = {
  className: "",
};

export default withForwardRef(Input);
