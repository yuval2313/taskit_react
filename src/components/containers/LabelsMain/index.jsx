import React from "react";

import { TransitionGroup } from "react-transition-group";

import Label from "../../Label";
import SideBarItem from "../../common/generic/SideBarItem";
import Separator from "../../common/generic/Separator";

import styles from "./index.module.scss";

function LabelsMain({ labels }) {
  return (
    <div className={styles.container}>
      <TransitionGroup>
        {labels.map((label) => (
          <SideBarItem
            key={label._id}
            timeout={400}
            classNames="sidebar-item-transition"
          >
            <Label label={label} />
          </SideBarItem>
        ))}
      </TransitionGroup>
      <Separator />
    </div>
  );
}

export default LabelsMain;
