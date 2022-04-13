import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import "./index.css";

function Textarea({ name, ...rest }) {
  return <TextareaAutosize name={name} id={name} {...rest} />;
}

export default Textarea;
