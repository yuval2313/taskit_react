import React, { useState } from "react";

export default function withHover(Component) {
  return function WithHover(props) {
    const [hovering, setHovering] = useState(false);

    function handleOnMouseOver() {
      setHovering(true);
    }

    function handleOnMouseLeave() {
      setHovering(false);
    }

    return (
      <div onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
        <Component {...props} hovering={hovering} />
      </div>
    );
  };
}
