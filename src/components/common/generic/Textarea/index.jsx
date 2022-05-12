import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./index.module.scss";

function Textarea({ name, ...rest }) {
  return (
    <TextareaAutosize
      className={styles.textarea}
      name={name}
      id={name}
      {...rest}
    />
  );
}

export default Textarea;
