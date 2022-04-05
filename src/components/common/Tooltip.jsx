import React from "react";

import "../../styles/common/Tooltip.css";

function Tooltip({ tooltip }) {
  return (
    <div className="tooltip-container">
      <div className="tooltip-box">
        {tooltip}
        <span className="tooltip-arrow"></span>
      </div>
    </div>
  );
}

export default Tooltip;
