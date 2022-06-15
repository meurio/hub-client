import React from "react";

interface DropdownInputProps {
  value: string;
}

const DropdownInput: React.FC<DropdownInputProps> = ({ value }) => (
  <span>{value}</span>
);

export default DropdownInput;
