import React, { useState } from "react";

import Dropdown from "./common/Dropdown";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// import "../styles/Priority.css";

function Priority({ task, onChange, disabled }) {
  const [showPriorities, setShowPriorities] = useState(false);

  const priorities = [
    { label: "Urgent", value: "urgent" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <Dropdown
      onChange={onChange}
      showMenu={showPriorities}
      setShowMenu={setShowPriorities}
      name="priority"
      options={priorities}
      selectedOption={task.priority}
      className="priority-bar"
      buttonClassName="priority-btn btn-clear btn-pill"
      menuClassName={task.priority}
      icon={faExclamationTriangle}
      placeholder="+ Priority"
      tooltip="Set Priority"
      disabled={disabled}
    />
  );
}

export default Priority;
