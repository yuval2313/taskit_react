import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addLabel } from "../../../store/entities/labels";

import Input from "../../common/generic/Input";
import Button from "../../common/generic/Button";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelsHead(props) {
  const [newLabel, setNewLabel] = useState({ name: "" });
  const dispatch = useDispatch();

  function handleChange({ currentTarget }) {
    const name = currentTarget.value;
    setNewLabel({ name });
  }

  function handleAddLabel() {
    dispatch(addLabel(newLabel));
    setNewLabel({ name: "" });
  }

  function handleCancelAdd() {
    setNewLabel({ name: "" });
  }

  return (
    <div className={styles.container}>
      <Input
        placeholder="Add Label..."
        value={newLabel.name}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddLabel();
          if (e.key === "Escape") {
            handleCancelAdd();
            e.currentTarget.blur();
          }
        }}
        maxLength={50}
      />
      <Button
        icon={faPlusCircle}
        disabled={!newLabel.name}
        onClick={handleAddLabel}
      />
    </div>
  );
}

export default LabelsHead;
