import React from "react";

import DropdownItem from "../../../common/DropdownItem";
import LabelNameEdit from "../../LabelsFeatures/LabelNameEdit";

function TaskAddLabelsItem({ label, ...rest }) {
  return (
    <DropdownItem name={"labels"} value={label._id} {...rest}>
      <LabelNameEdit editable={false} labelName={label.name} />
    </DropdownItem>
  );
}

export default TaskAddLabelsItem;
