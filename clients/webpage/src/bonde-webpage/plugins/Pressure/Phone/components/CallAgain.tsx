import React from 'react';

import styled from '@emotion/styled';
import { Button as Btn } from '../../../../components/forms';

const Wrapper = styled.li`
  background-color: #c20000;
`;

const Button = styled(Btn as any)`
  && {
    max-width: 120px;
    border-radius: 2px;
  }
`;

const Target = styled.div`
  &:last-child {
    text-transform: none;
  }
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  align-items: center;
  & > button {
    border-color: #333;
    color: #333;
    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }
`;

const CallAgain = ({
  listKey,
  attempts,
  addTwilioCallMutation,
  name,
}: {
  listKey: string;
  attempts: number;
  addTwilioCallMutation: any;
  name: string;
}) => {
  return (
    <Wrapper key={listKey}>
      <Target>
        <span className="fa fa-phone-square" />
        <div>{name}</div>
      </Target>
      <Target>
        <div>{attempts}x</div>
        <Button
          dark
          onClick={(e: any) => {
            e.preventDefault();
            addTwilioCallMutation();
          }}
        >
          Religar
        </Button>
      </Target>
    </Wrapper>
  );
};

export default CallAgain;
