import React from "react";

import styles from "./index.module.scss";

function HighlightSearch({ searchQuery, value, placeholder }) {
  function highlightSearch(string) {
    const regex = new RegExp(`(${searchQuery})`, "i");
    const parts = string.split(regex);

    return searchQuery ? (
      <div>
        {parts.map((part, i) =>
          part.match(regex) ? (
            <span key={i} className={styles.highlighted}>
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

  return value.trim().length ? (
    highlightSearch(value)
  ) : (
    <span className={styles.placeholder}>{placeholder}</span>
  );
}

export default HighlightSearch;
