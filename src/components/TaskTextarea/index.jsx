import React from "react";

import Textarea from "components/Textarea";
import HighlightSearch from "components/HighlightSearch";

function TaskTextarea({
  name,
  value,
  placeholder,
  selected,
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
