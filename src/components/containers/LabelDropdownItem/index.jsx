import React from "react";

import DropdownItem from "../../common/generic/DropdownItem";
import LabelNameEdit from "../LabelNameEdit";

function LabelDropdownItem({ label, ...rest }) {
  return (
    <DropdownItem name={"labels"} value={label._id} {...rest}>
      <LabelNameEdit editable={false} labelName={label.name} />
    </DropdownItem>
  );
}

export default LabelDropdownItem;
