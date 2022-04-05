import React from "react";

function HighlightSearch({ searchQuery, value, placeholder }) {
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

  return value && value.trim().length !== 0 ? (
    highlightSearch(value)
  ) : (
    <span className="muted">{placeholder}</span>
  );
}

export default HighlightSearch;
