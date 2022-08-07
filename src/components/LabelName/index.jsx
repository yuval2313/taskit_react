import React, { useState } from "react";

import { useClickOutside } from "hooks/useClickOutside";

import Icon from "components/Icon";
import Button from "components/Button";
import Input from "components/Input";

import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelName({ editable, labelName, onConfirmEdit, onExitEdit }) {
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
          <Button icon={faCheck} onClick={handleConfirmEdit} />
        </div>
      ) : (
        <span className={styles.name}>{labelName}</span>
      )}
    </div>
  );
}

export default LabelName;
