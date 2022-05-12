import React from "react";
import { useSelector } from "react-redux";
import { getSearchQuery } from "../../../store/ui/tasksPage";

import Textarea from "../generic/Textarea";
import HighlightSearch from "../HighlightSearch";

function TaskTextarea({ selected, name, value, placeholder, ...rest }) {
  const searchQuery = useSelector(getSearchQuery);

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
