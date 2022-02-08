import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/common/Button.css";

function Button({ label, icon, className, ...rest }) {
  return (
    <button
      className={icon ? `btn btn-circle ${className}` : className}
      {...rest}
    >
      {icon ? <FontAwesomeIcon className="btn-icon" icon={icon} /> : label}
    </button>
  );
}

Button.defaultProps = {
  className: "btn",
};

export default Button;
