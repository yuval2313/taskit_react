import React from "react";
import Input from "components/Input";

function DatePicker({ disabled, error, ...rest }) {
  return (
    <Input
      type={"datetime-local"}
      disabled={disabled}
      error={disabled ? null : error}
      {...rest}
    />
  );
}

export default DatePicker;
