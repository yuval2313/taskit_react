import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchLabels,
  getLabels,
  isLoading,
  createLabel,
  removeLabel,
  updateLabel,
} from "store/entities/labels";
import { selectLabel, deselectLabel, getSelectedLabelId } from "store/ui";

import Loading from "components/Loading";
import LabelsHead from "./components/LabelsHead";
import LabelsMain from "./components/LabelsMain";

import { useLogout } from "hooks/useLogout";

import styles from "./index.module.scss";

function Labels() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const labels = useSelector(getLabels);
  const loading = useSelector(isLoading);
  const selectedLabelId = useSelector(getSelectedLabelId);

  const logout = useLogout();

  useEffect(() => {
    populateLabels();
  }, []);

  async function populateLabels() {
    try {
      await dispatch(fetchLabels()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === 400 || status === 401) {
        return logout();
      }
    }
  }

  function handleCreateLabel() {
    return dispatch(createLabel({ name: searchQuery }));
  }
  function handleDeleteLabel(labelId) {
    if (selectedLabelId === labelId) handleDeselectLabel();
    return dispatch(removeLabel(labelId));
  }
  function handleUpdateLabel(label, previousName) {
    return dispatch(updateLabel({ label, previousName }));
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }
  function handleClearSearch() {
    setSearchQuery("");
  }

  function handleSelectLabel(labelId) {
    return dispatch(selectLabel(labelId));
  }
  function handleDeselectLabel() {
    return dispatch(deselectLabel());
  }

  return loading ? (
    <Loading className={styles.loading} />
  ) : (
    <React.Fragment>
      <LabelsHead
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onAddLabel={handleCreateLabel}
      />
      <LabelsMain
        labels={labels}
        searchQuery={searchQuery}
        selectedLabelId={selectedLabelId}
        onSelectLabel={handleSelectLabel}
        onDeselectLabel={handleDeselectLabel}
        onDeleteLabel={handleDeleteLabel}
        onUpdateLabel={handleUpdateLabel}
      />
    </React.Fragment>
  );
}

export default Labels;
