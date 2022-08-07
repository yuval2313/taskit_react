import React, { useEffect } from "react";

import { useWindowSize } from "hooks/useWindowSize";

import Button from "components/Button";

import { faTh, faColumns } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function SetView({ view, tableSort, onToggleView, onToggleTableSort }) {
  const minWidth = 1200;
  const { width: viewportWidth } = useWindowSize();

  useEffect(() => {
    if (viewportWidth < minWidth && view === "table") onToggleView();
  }, [viewportWidth, view]);

  function renderIcon() {
    return view === "grid" ? faTh : faColumns;
  }

  function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div
      className={`${styles.container} ${
        view === "table" ? styles.table : styles.grid
      }`}
    >
      {viewportWidth > minWidth && (
        <Button
          className={styles.toggle_view}
          icon={renderIcon()}
          onClick={onToggleView}
          tooltip={"Toggle View"}
        />
      )}
      {view === "table" && (
        <Button
          className={styles.toggle_sort}
          label={capitalizeWord(tableSort)}
          onClick={onToggleTableSort}
        />
      )}
    </div>
  );
}

export default SetView;
