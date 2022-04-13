import React from "react";

import Button from "../common/Button";

import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";
import Icon from "../common/Icon";

import "./index.css";

function Labels({ labels: taskLabels }) {
  return (
    <div className="labels-container">
      {taskLabels.map((label) => (
        <span key={label._id} className="btn btn-pill btn-clear">
          <Icon className={"tag-icon"} icon={faTag} />
          {label.name}
        </span>
      ))}
      {/* TODO: Add dropdown with 'Add new label option' which turns into input field */}
      <Button className="btn-pill btn-clear" rightIcon={faTags} label="+" />
    </div>
  );
}

export default Labels;
