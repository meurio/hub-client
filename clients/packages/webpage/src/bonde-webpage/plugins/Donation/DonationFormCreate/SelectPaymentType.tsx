import React from 'react';
import UniqueIcon from './UniqueIcon';
import RecurringIcon from './RecurringIcon';
import styled from '@emotion/styled';

type SelectStyledProps = {
  mainColor: string;
};

const SelectPaymentTypeStyled = styled.div<SelectStyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 0.9rem;
    text-decoration: none;
    border: none;
    background: inherit;
    cursor: pointer;
    font-weight: 700;
    padding: 0.5rem 0;
    opacity: 0.3;

    &:focus {
      outline: none;
    }
    &.active {
      opacity: 1;
      color: ${props => props.mainColor};
    }

    svg {
      width: 35px;
      height: 35px;
      margin: 0 auto 1rem;
    }
  }

  &:after,
  &:before {
    content: ' ';
    display: table;
  }
`;

type Props = {
  mainColor: string;
  selected: string;
  onSelect: (paymentType: string) => void;
  uniqueLabel: string;
  recurringLabel: string;
};

const SelectPaymentType: React.FC<Props> = ({
  mainColor,
  selected,
  onSelect,
  uniqueLabel,
  recurringLabel,
}) => (
  <SelectPaymentTypeStyled mainColor={mainColor}>
    <button
      type="button"
      className={selected === 'recurring' ? 'active' : ''}
      onClick={() => onSelect('recurring')}
    >
      <RecurringIcon />
      {recurringLabel}
    </button>
    <button
      type="button"
      className={selected === 'unique' ? 'active' : ''}
      onClick={() => onSelect('unique')}
    >
      <UniqueIcon />
      {uniqueLabel}
    </button>
  </SelectPaymentTypeStyled>
);

export default SelectPaymentType;
