import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addLabel } from "../../../store/entities/labels";
import {
  getSearchQuery,
  queryLabels,
  clearQuery,
} from "../../../store/ui/labelsSideBar";

import Input from "../../common/generic/Input";
import Button from "../../common/generic/Button";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelsHead() {
  // const [newLabel, setNewLabel] = useState({ name: "" });
  const searchQuery = useSelector(getSearchQuery);
  const dispatch = useDispatch();

  function handleChange({ currentTarget }) {
    dispatch(queryLabels(currentTarget.value));
  }

  function handleAddLabel() {
    dispatch(addLabel({ name: searchQuery }));
    dispatch(clearQuery());
    // dispatch(addLabel(newLabel));
    // setNewLabel({ name: "" });
  }

  function handleCancelAdd() {
    dispatch(clearQuery());
    // setNewLabel({ name: "" });
  }

  return (
    <div className={styles.container}>
      <Input
        placeholder="Search..."
        value={searchQuery}
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
        disabled={!searchQuery}
        onClick={handleAddLabel}
        tooltip="Add Label"
      />
    </div>
  );
}

export default LabelsHead;
