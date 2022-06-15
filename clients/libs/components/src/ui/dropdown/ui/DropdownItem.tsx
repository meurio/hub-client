import React from "react";
import styled from "styled-components";

const DropdownItem = styled(({ className, value }) => (
  <div className={className}>{value}</div>
))`
  display: flex;
  padding: 10px 25px;
  flex-grow: 1;
  align-items: center;

  &:hover {
    color: #ee0099;
  }
`;

export default DropdownItem;
