import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  setGridView,
  setTableView,
  getView,
  sortTableByStatus,
  sortTableByPriority,
  getTableSort,
} from "../../../../store/ui/tasksPage";

import { useWindowSize } from "../../../../hooks/useWindowSize";

import Button from "../../../common/Button";

import { faTh, faColumns } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function SetView() {
  const dispatch = useDispatch();
  const view = useSelector(getView);
  const tableSort = useSelector(getTableSort);
  const { width: viewportWidth } = useWindowSize();

  useEffect(() => {
    if (viewportWidth < 1500 && view === "table") toggleView();
  }, [viewportWidth, view]);

  function renderIcon() {
    return view === "grid" ? faTh : faColumns;
  }

  function toggleView() {
    if (view === "grid") return dispatch(setTableView());
    else return dispatch(setGridView());
  }

  function toggleTableSort() {
    if (tableSort === "status") return dispatch(sortTableByPriority());
    else return dispatch(sortTableByStatus());
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
      {viewportWidth > 1500 && (
        <Button
          className={styles.toggle_view}
          icon={renderIcon()}
          onClick={toggleView}
          tooltip={"Toggle View"}
        />
      )}
      {view === "table" && (
        <Button
          className={styles.toggle_sort}
          label={capitalizeWord(tableSort)}
          onClick={toggleTableSort}
        />
      )}
    </div>
  );
}

export default SetView;
