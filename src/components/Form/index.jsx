import React from "react";

import styles from "./index.module.scss";

function Form({ children, onSubmit }) {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

export default Form;
