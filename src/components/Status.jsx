import React, { useState } from "react";
import Dropdown from "./common/Dropdown";

import "../styles/Status.css";

function Status({ task, onChange }) {
  const [showStatuses, setShowStatuses] = useState(false);

  const statuses = [
    { label: "Not Started", value: "todo" },
    { label: "In Progress", value: "doing" },
    { label: "Complete!", value: "complete" },
  ];

  return (
    <Dropdown
      onChange={onChange}
      showMenu={showStatuses}
      setShowMenu={setShowStatuses}
      name="status"
      options={statuses}
      selectedOption={task.status}
      placeholder="+ Status"
      className="status-bar"
      buttonClassName="btn-pill"
    />
  );
}

export default Status;
