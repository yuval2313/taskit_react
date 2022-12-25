import React from "react";

import Button from "components/Button";

import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
function EventFormSubmit({
  event,
  editable,
  disabled,
  onSubmit,
  onSubmitEdit,
  onDelete,
  onSetEdit,
  onCancelEdit,
}) {
  return event ? (
    <div className={styles.edit}>
      {editable ? (
        <React.Fragment>
          <Button icon={faTimes} onClick={onCancelEdit} />
          <Button icon={faCheck} onClick={onSubmitEdit} disabled={disabled} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button icon={faTrashAlt} onClick={onDelete} />
          <Button icon={faEdit} onClick={onSetEdit} />
        </React.Fragment>
      )}
    </div>
  ) : (
    <Button
      className={styles.submit}
      label="Submit"
      onClick={onSubmit}
      disabled={disabled}
    />
  );
}

export default EventFormSubmit;
