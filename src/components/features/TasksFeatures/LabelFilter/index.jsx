import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getSelectedLabelId,
  deselectLabel,
} from "../../../../store/ui/labelsSideBar";
import { getLabelById } from "../../../../store/entities/labels";

import withHover from "../../../hoc/withHover";

import Icon from "../../../common/Icon";
import Hover from "../../../common/Hover";
import Button from "../../../common/Button";
import Separator from "../../../common/Separator";

import { faFilter, faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelFilter({ hovering }) {
  const dispatch = useDispatch();
  const selectedLabelId = useSelector(getSelectedLabelId);
  const selectedLabel = useSelector(getLabelById(selectedLabelId));

  function handleClearFilter() {
    dispatch(deselectLabel());
  }
  return (
    selectedLabelId && (
      <div className={styles.container}>
        <Icon icon={faFilter} className={styles.icon} />
        <Separator className={styles.separator} />
        <div className={styles.label}>
          <Icon icon={faTag} />
          <span className={styles.name}>{selectedLabel.name}</span>
        </div>
        <Hover
          in={hovering}
          classNames="hover-transition"
          timeout={300}
          unmountOnExit
        >
          <Button
            icon={faTimes}
            onClick={handleClearFilter}
            tooltip="Clear Filter"
          />
        </Hover>
      </div>
    )
  );
}

export default withHover(LabelFilter);
