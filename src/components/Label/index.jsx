import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteLabel, updateLabel } from "./../../store/entities/labels";

import LabelNameEdit from "../containers/LabelNameEdit";
import LabelHoverButtons from "../containers/LabelHoverButtons";

import styles from "./index.module.scss";

function Label({ label }) {
  const [hovering, setHovering] = useState(false);
  const [editable, setEditable] = useState(false);

  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteLabel(label));
  }

  function handleEdit() {
    setEditable(true);
  }

  function handleExitEdit() {
    setEditable(false);
  }

  function handleConfirmEdit(labelNameEdit) {
    const labelClone = { ...label };
    labelClone.name = labelNameEdit;
    dispatch(updateLabel({ label: labelClone, previousName: label.name }));
  }
  return (
    <div
      className={styles.container}
      onMouseOver={(e) => setHovering(true)}
      onMouseLeave={(e) => setHovering(false)}
    >
      <LabelNameEdit
        editable={editable}
        labelName={label.name}
        onConfirmEdit={handleConfirmEdit}
        onExitEdit={handleExitEdit}
      />
      {!editable && (
        <LabelHoverButtons
          onEdit={handleEdit}
          onDelete={handleDelete}
          in={hovering}
          classNames="label-hover-transition"
          timeout={300}
          unmountOnExit
        />
      )}
    </div>
  );
}

export default Label;
