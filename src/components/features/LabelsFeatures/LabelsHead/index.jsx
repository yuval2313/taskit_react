import React from "react";

import Input from "../../../common/Input";
import Button from "../../../common/Button";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelsHead({ searchQuery, onSearch, onClearSearch, onAddLabel }) {
  function handleAddLabel() {
    onAddLabel();
    onClearSearch();
  }

  function handleCancel({ currentTarget }) {
    onClearSearch();
    currentTarget.blur();
  }

  function handleChange({ currentTarget }) {
    onSearch(currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <Input
        placeholder="Search / Add..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") return handleAddLabel();
          if (e.key === "Escape") return handleCancel(e);
        }}
        maxLength={50}
      />
      <Button
        icon={faPlusCircle}
        disabled={!searchQuery}
        onClick={handleAddLabel}
        tooltip="Add Label"
      />
    </div>
  );
}

export default LabelsHead;
