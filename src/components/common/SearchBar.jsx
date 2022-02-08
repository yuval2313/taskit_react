import React from "react";

function SearchBar({ name, className, ...rest }) {
  return (
    <div className="form-group">
      <input
        name={name}
        id={name}
        className={`form-control ${className ? className : ""}`}
        type="search"
        {...rest}
      />
    </div>
  );
}

export default SearchBar;
