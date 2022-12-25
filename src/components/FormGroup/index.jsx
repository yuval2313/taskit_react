import React from "react";

import styles from "./index.module.scss";
function FormGroup({ label, children }) {
  return (
    <div className={styles.form_group}>
      <h3 className={styles.label}>{label}</h3>
      {children}
    </div>
  );
}

export default FormGroup;
