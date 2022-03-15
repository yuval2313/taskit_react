import React, { useContext } from "react";

import TextareaAutosize from "react-textarea-autosize";
import TasksContext from "../context/TasksContext";

import "../styles/common/TextArea.css";

function TaskTextarea({ name, selected, value, placeholder, ...rest }) {
  const { searchQuery } = useContext(TasksContext);

  function highlightSearch(string) {
    const regex = new RegExp(`(${searchQuery})`, "i");
    const parts = string.split(regex);

    return searchQuery ? (
      <div>
        {parts.map((part, i) =>
          part.match(regex) ? (
            <span key={i} className="highlighted">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </div>
    ) : (
      string
    );
  }

  return !selected ? (
    value && value.trim().length !== 0 ? (
      highlightSearch(value)
    ) : (
      <span className="muted">{placeholder}</span>
    )
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
