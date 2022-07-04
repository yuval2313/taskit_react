import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeLabel, updateLabel } from "../../../../store/entities/labels";
import { removeTasksLabel } from "../../../../store/entities/tasks";
import {
  getSelectedLabelId,
  selectLabel,
  deselectLabel,
} from "../../../../store/ui/labelsSideBar";

import withHover from "../../../hoc/withHover";

import LabelNameEdit from "../LabelNameEdit";
import Hover from "../../../common/Hover";
import Button from "../../../common/Button";

import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function Label({ label, hovering }) {
  const [deleting, setDeleting] = useState(false);
  const [editable, setEditable] = useState(false);

  const dispatch = useDispatch();
  const selectedLabelId = useSelector(getSelectedLabelId);

  async function handleDelete(e) {
    e.stopPropagation();

    const selected = selectedLabelId === label._id;
    setDeleting(true);
    if (selected) dispatch(deselectLabel());

    try {
      await dispatch(removeLabel(label)).unwrap();
      dispatch(removeTasksLabel(label._id));
    } catch (ex) {
      setDeleting(false);
      dispatch(selectLabel(label._id));
    }
  }

  function handleEdit(e) {
    e.stopPropagation();
    setEditable(true);
  }

  function handleExitEdit() {
    setEditable(false);
  }

  function handleConfirmEdit(labelNameEdit) {
    dispatch(
      updateLabel({
        label: { ...label, name: labelNameEdit },
        previousName: label.name,
      })
    );
  }

  return (
    <div className={`${styles.container} ${deleting ? styles.deleting : ""}`}>
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
          <Button icon={faPencilAlt} onClick={(e) => handleEdit(e)} />
          <Button icon={faTimes} onClick={(e) => handleDelete(e)} />
        </Hover>
      )}
    </div>
  );
}

export default withHover(Label);
