import React, { useContext } from "react";

import TextareaAutosize from "react-textarea-autosize";
import TasksContext from "./../../context/TasksContext";

import "../../styles/common/TextArea.css";

function TextArea({ name, selected, value, placeholder, ...rest }) {
  const { searchQuery } = useContext(TasksContext);

  function highlightSearch(string) {
    const regex = new RegExp(`(${searchQuery})`, "i");
    const parts = string.split(regex);

    return searchQuery
      ? parts.map((part, i) =>
          part.match(regex) ? (
            <span key={i} className="highlighted">
              {part}
            </span>
          ) : (
            part
          )
        )
      : string;
  }

  return (
    <div className={`task-${name}`}>
      {!selected ? (
        value.trim().length !== 0 ? (
          highlightSearch(value)
        ) : (
          <span className="muted">{placeholder}</span>
        )
      ) : (
        <TextareaAutosize
          name={name}
          id={name}
          value={value.trim().length !== 0 ? value : null}
          placeholder={placeholder}
          {...rest}
        />
      )}
    </div>
  );
}

export default TextArea;
