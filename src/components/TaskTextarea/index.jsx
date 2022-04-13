import React from "react";

import Textarea from "../common/Textarea";
import HighlightSearch from "../common/HighlightSearch";

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
      placeholder={placeholder}
    />
  ) : (
    <Textarea name={name} value={value} placeholder={placeholder} {...rest} />
  );
}

export default TaskTextarea;
