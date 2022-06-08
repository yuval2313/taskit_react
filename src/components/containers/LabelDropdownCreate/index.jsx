import React from "react";

import DropdownItem from "../../common/generic/DropdownItem";
import Button from "../../common/generic/Button";
import LabelNameEdit from "../LabelNameEdit";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelDropdownCreate({ newLabelName, onCreate }) {
  return (
    <DropdownItem className={styles.create}>
      <LabelNameEdit editable={false} labelName={`"${newLabelName}"`} />
      <Button icon={faPlus} onClick={onCreate} />
    </DropdownItem>
  );
}

export default LabelDropdownCreate;
