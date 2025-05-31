import React from "react";

const Input = ({ type = "text", value, onChange, placeholder, ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border rounded px-3 py-2"
    {...props}
  />
);

export default Input; 