import React, { useState } from "react";

export default function withTooltip(Component) {
  return function WithTooltip(props) {
    const [showTooltip, setShowTooltip] = useState(false);

    function handleOnMouseOver() {
      setShowTooltip(true);
    }

    function handleOnMouseOut() {
      setShowTooltip(false);
    }

    return (
      <div onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
        <Component {...props} showTooltip={showTooltip} />
      </div>
    );
  };
}
