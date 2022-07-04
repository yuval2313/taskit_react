import React, { useContext } from "react";
import TaskContext from "../../../context/TaskContext";

import { useSelector } from "react-redux";
import { getSearchQuery } from "../../../../store/ui/tasksPage";

import Textarea from "../../../common/Textarea";
import HighlightSearch from "../../../common/HighlightSearch";

function TaskTextarea({ name, value, placeholder, ...rest }) {
  const searchQuery = useSelector(getSearchQuery);
  const { task, handlers } = useContext(TaskContext);

  const { selected } = task;
  const { handleChange } = handlers;

  return !selected ? (
    <HighlightSearch
      searchQuery={searchQuery}
      value={value}
      placeholder={placeholder}
    />
  ) : (
    <Textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default TaskTextarea;
