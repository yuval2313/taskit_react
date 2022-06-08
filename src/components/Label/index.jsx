import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { removeLabel, updateLabel } from "./../../store/entities/labels";

import withHover from "../hoc/withHover";

import LabelNameEdit from "../containers/LabelNameEdit";
import Hover from "../common/generic/Hover";
import Button from "../common/generic/Button";

import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import { removeTasksLabel } from "../../store/entities/tasks";

function Label({ label, hovering }) {
  const [editable, setEditable] = useState(false);

  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      await dispatch(removeLabel(label)).unwrap();
      dispatch(removeTasksLabel(label._id));
    } catch (ex) {}
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
    <div className={styles.container}>
      <LabelNameEdit
        editable={editable}
        labelName={label.name}
        onConfirmEdit={handleConfirmEdit}
        onExitEdit={handleExitEdit}
      />
      {!editable && (
        <Hover
          className={styles.hover}
          in={hovering}
          classNames="hover-transition"
          timeout={300}
          unmountOnExit
        >
          <Button icon={faPencilAlt} onClick={handleEdit} />
          <Button icon={faTimes} onClick={handleDelete} />
        </Hover>
      )}
    </div>
  );
}

export default withHover(Label);
