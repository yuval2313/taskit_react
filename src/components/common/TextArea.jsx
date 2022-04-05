import React from "react";
import TextareaAutosize from "react-textarea-autosize";

function TextArea({ name, ...rest }) {
  return <TextareaAutosize name={name} id={name} {...rest} />;
}

export default TextArea;
