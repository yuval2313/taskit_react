import React, { useState } from "react";
import { useCanHover } from "hooks/useCanHover";

export default function withHover(Component) {
  return function WithHover(props) {
    const [hovering, setHovering] = useState(false);
    const canHover = useCanHover();

    function handleOnMouseOver() {
      setHovering(true);
    }

    function handleOnMouseLeave() {
      setHovering(false);
    }

    return (
      <div onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
        <Component {...props} hovering={!canHover || hovering} />
      </div>
    );
  };
}
