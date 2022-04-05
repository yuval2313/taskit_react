import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon({ icon, ...rest }) {
  return (
    <span {...rest}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

export default Icon;
