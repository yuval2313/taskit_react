import React, { useEffect } from "react";

import { TransitionGroup } from "react-transition-group";

import { useDispatch, useSelector } from "react-redux";
import { fetchLabels, getLabels } from "../../store/entities/labels";

import SideBarMenu from "../common/generic/SideBarMenu";
import SideBarItem from "../common/generic/SideBarItem";
import Label from "../Label";
import Separator from "./../common/generic/Separator/index";
import LabelsHead from "../containers/LabelsHead";

function Labels({ className }) {
  const dispatch = useDispatch();
  const labels = useSelector(getLabels);

  useEffect(() => {
    populateLabels();
  }, []);

  async function populateLabels() {
    try {
      await dispatch(fetchLabels()).unwrap();
    } catch (ex) {
      const { status } = ex;
      if (status === (400 || 401)) {
        window.location = "/logout";
      }
    }
  }

  return (
    <SideBarMenu className={className}>
      <LabelsHead />
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
    </SideBarMenu>
  );
}

export default Labels;
