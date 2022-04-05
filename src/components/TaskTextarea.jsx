import React from "react";

import TextareaAutosize from "react-textarea-autosize";
import HighlightSearch from "./common/HighlightSearch";

import "../styles/common/TextArea.css";

function TaskTextarea({
  selected,
  name,
  value,
  placeholder,
  searchQuery,
  ...rest
}) {
  return !selected ? (
    <HighlightSearch
      searchQuery={searchQuery}
      value={value}
      plaveholder={placeholder}
    />
  ) : (
    <TextareaAutosize
      name={name}
      id={name}
      value={value}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default TaskTextarea;
