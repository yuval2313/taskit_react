import React from "react";

import { useDispatch } from "react-redux";
import { createLabel } from "../../../../store/entities/labels";

import DropdownItem from "../../../common/DropdownItem";
import Button from "../../../common/Button";
import LabelNameEdit from "../../LabelsFeatures/LabelNameEdit";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function TaskAddLabelsCreate({ newLabelName, onSelect }) {
  const dispatch = useDispatch();

  async function handleCreate(e) {
    try {
      const label = await dispatch(
        createLabel({ name: newLabelName })
      ).unwrap();
      return onSelect({
        ...e,
        currentTarget: { name: "labels", value: label._id },
      });
    } catch (ex) {}
  }

  return (
    <DropdownItem className={styles.create}>
      <LabelNameEdit editable={false} labelName={`"${newLabelName}"`} />
      <Button icon={faPlus} onClick={handleCreate} />
    </DropdownItem>
  );
}

export default TaskAddLabelsCreate;
