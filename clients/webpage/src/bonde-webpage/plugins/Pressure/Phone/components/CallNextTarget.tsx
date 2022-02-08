import React from 'react';

import styled from '@emotion/styled';
import { Button as Btn } from '../../../../components/forms';

const Button = styled(Btn as any)`
  && {
    border-radius: 2px;
    background-color: #40b4f5;
    max-width: 120px;
    border-color: #40b4f5;
    &:hover {
      color: #fff;
    }
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;

  text-transform: uppercase;
  padding: 1.5rem;
`;

const CallNextTarget = ({
  listKey,
  name,
  addTwilioCallMutation,
}: {
  listKey: string;
  name: string;
  addTwilioCallMutation: any;
}) => {
  return (
    <Item key={listKey}>
      <div>
        <span className="fa fa-phone-square primary" />
        <div>{name}</div>
      </div>
      <Button
        type="button"
        light
        onClick={(e: any) => {
          e.preventDefault();
          addTwilioCallMutation();
        }}
      >
        Ligar
      </Button>
    </Item>
  );
};

export default CallNextTarget;
