import React from "react";
import styled from "styled-components";
import { SuccessIcon } from "./Icons";

const Message = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-right: 18px;
  }
`;

type Props = {
  message: string;
};

const Success = ({ message }: Props) => {
  return (
    <Message>
      <SuccessIcon />
      <span>{message}</span>
    </Message>
  );
};

export default Success;
