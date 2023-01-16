import React, { useState } from "react";

import withHover from "hoc/withHover";

import LabelName from "components/LabelName";
import Hover from "components/Hover";
import Button from "components/Button";

import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function Label({ label, onDelete, onUpdate, hovering }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  function handleEdit(e) {
    e.stopPropagation();
    setEditing(true);
  }

  function handleExitEdit() {
    setEditing(false);
  }

  async function handleDelete(e) {
    e.stopPropagation();
    const confirmation = window.confirm(
      "Are you sure? \nDeleting this label will remove it from all corresponding tasks."
    );

    if (confirmation) {
      setDeleting(true);
      try {
        await onDelete(label._id).unwrap();
      } catch (ex) {
        setDeleting(false);
      }
    }
  }

  function handleConfirmEdit(labelNameEdit) {
    return onUpdate({ ...label, name: labelNameEdit }, label.name);
  }

  return (
    <div className={`${styles.container} ${deleting ? styles.deleting : ""}`}>
      <LabelName
        editable={editing}
        labelName={label.name}
        onConfirmEdit={handleConfirmEdit}
        onExitEdit={handleExitEdit}
      />
      {!editing && (
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
