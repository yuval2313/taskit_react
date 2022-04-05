import React, { useState } from "react";

import Button from "./common/Button";
// import Dropdown from "./common/Dropdown";

import { faTag, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/Labels.css";

function Labels({ labels: taskLabels }) {
  //   const [showLabelsDropdown, setShowLabelsDropdown] = useState(false);

  return (
    <div className="labels-container">
      {taskLabels.map((label) => (
        <span key={label._id} className="btn btn-pill btn-clear">
          <FontAwesomeIcon className={"tag-icon"} icon={faTag} />
          {label.name}
        </span>
      ))}
      <Button className="btn-pill btn-clear" rightIcon={faTags} label="+" />
      {/* <Dropdown
        showMenu={showLabelsDropdown}
        setShowMenu={setShowLabelsDropdown}
        name="label"
        // options={}
        placeholder="+"
        icon={faTags}
        tooltip="Add Label"
      /> */}
    </div>
  );
}

export default Labels;
