import React, { useState } from "react";
import styled from "styled-components";
import TooltipIcon from "./TooltipIcon";

export const Message = styled.span`
  font-family: Nunito Sans;
  position: absolute;
  background-color: #424242;
  padding: 23px 16px;
  width: 250px;
  font-size: 13px;
  text-transform: none;
  color: #fff;
  right: -200px;
  top: 25px;
  line-height: 17.73px;
  z-index: 1;

  p {
    margin-bottom: 5px;
  }
`;

type Props = {
  className?: string;
  label?: string | any;
  info: string | any;
};

const Tooltip = styled(({ label, info, className }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      {label}
      <div
        style={{ position: "relative" }}
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
      >
        <TooltipIcon />
        {visible && <Message>{info}</Message>}
      </div>
    </div>
  );
})`
  display: flex;
  flex-direction: row;

  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default Tooltip;
