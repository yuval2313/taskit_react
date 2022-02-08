import React from "react";

import "../../styles/common/Input.css";

const Input = ({ name, error, className, ...rest }) => {
  return (
    <div className="form-group">
      <input
        {...rest}
        id={name}
        name={name}
        className={`form-control ${className ? className : ""}`}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;
