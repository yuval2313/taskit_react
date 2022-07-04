import React, { useState } from "react";

import { useClickOutside } from "../../../../hooks/useClickOutside";

import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import Input from "../../../common/Input";

import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelNameEdit({ editable, labelName, onConfirmEdit, onExitEdit }) {
  const [labelNameEdit, setLabelNameEdit] = useState(labelName);

  const cancelEditRef = useClickOutside(() => {
    if (editable) onExitEdit();
  });

  function handleChange({ currentTarget }) {
    setLabelNameEdit(currentTarget.value);
  }

  function handleCancelEdit() {
    setLabelNameEdit(labelName);
    return onExitEdit();
  }

  function handleConfirmEdit(e) {
    e.stopPropagation();

    if (!labelNameEdit.length) return handleCancelEdit();

    if (labelName !== labelNameEdit) onConfirmEdit(labelNameEdit);
    return onExitEdit();
  }

  return (
    <div className={styles.container}>
      <Icon className={styles.icon} icon={faTag} />
      {editable ? (
        <div className={styles.edit} ref={cancelEditRef}>
          <Input
            value={labelNameEdit}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") return handleCancelEdit();
              if (e.key === "Enter") return handleConfirmEdit(e);
            }}
            maxLength={50}
            autoFocus
          />
          <Button icon={faCheck} onClick={(e) => handleConfirmEdit(e)} />
        </div>
      ) : (
        <span className={styles.name}>{labelName}</span>
      )}
    </div>
  );
}

export default LabelNameEdit;
