import React from "react";
import styled from "styled-components";
import Icon from "../content/Icon";

const DropdownIconItem = styled(({ className, value, onClick }: any) => {
  const { icon, label } = value;

  return (
    <div className={className} onClick={onClick}>
      <Icon name={icon} size="small" />
      {label}
    </div>
  );
})`
  display: flex;
  padding: 10px 25px;
  flex-grow: 1;
  align-items: center;

  ${Icon} {
    margin-right: 10px;
  }

  &:hover {
    color: #ee0099;

    ${Icon} {
      path {
        color: #ee0099;
        fill: #ee0099;
        stroke: #ee0099;
      }
    }
  }
`;

export default DropdownIconItem;
