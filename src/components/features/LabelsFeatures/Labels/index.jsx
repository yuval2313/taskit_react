import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchLabels,
  getLabels,
  isLoading,
  createLabel,
} from "../../../../store/entities/labels";
import {
  selectLabel,
  deselectLabel,
  getSelectedLabelId,
} from "../../../../store/ui/labelsSideBar";

import Loading from "../../../common/Loading";
import LabelsHead from "../LabelsHead";
import LabelsMain from "../LabelsMain";

import styles from "./index.module.scss";

function Labels() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const labels = useSelector(getLabels);
  const loading = useSelector(isLoading);
  const selectedLabelId = useSelector(getSelectedLabelId);

  useEffect(() => {
    populateLabels();
  }, []);

  async function populateLabels() {
    try {
      await dispatch(fetchLabels()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === (400 || 401)) {
        window.location = "/logout";
      }
    }
  }

  function handleCreate() {
    dispatch(createLabel({ name: searchQuery }));
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleClearSearch() {
    setSearchQuery("");
  }

  function handleSelect(labelId) {
    dispatch(selectLabel(labelId));
  }

  function handleDeselect() {
    dispatch(deselectLabel());
  }

  return loading ? (
    <Loading className={styles.loading} />
  ) : (
    <React.Fragment>
      <LabelsHead
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onAddLabel={handleCreate}
      />
      <LabelsMain
        labels={labels}
        searchQuery={searchQuery}
        selectedLabelId={selectedLabelId}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
      />
    </React.Fragment>
  );
}

export default Labels;
