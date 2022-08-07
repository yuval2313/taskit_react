import React from "react";

import withHover from "hoc/withHover";

import Icon from "components/Icon";
import Hover from "components/Hover";
import Button from "components/Button";
import Separator from "components/Separator";
import LabelName from "components/LabelName";

import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

function LabelFilter({ selectedLabel, onDeselectLabel, hovering }) {
  return (
    !!selectedLabel && (
      <div className={styles.container}>
        <Icon icon={faFilter} className={styles.icon} />
        <Separator className={styles.separator} />
        <LabelName labelName={selectedLabel.name} />
        <Hover
          in={hovering}
          classNames="hover-transition"
          timeout={300}
          unmountOnExit
        >
          <Button
            icon={faTimes}
            onClick={onDeselectLabel}
            tooltip="Clear Filter"
          />
        </Hover>
      </div>
    )
  );
}

export default withHover(LabelFilter);
