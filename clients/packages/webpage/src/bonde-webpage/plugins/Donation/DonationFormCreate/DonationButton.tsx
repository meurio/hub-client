import React from 'react';
import styled from '@emotion/styled';

const rgba = (color: string, alpha: number) => {
  const value = color.replace('#', '');
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha / 100 + ')';
};

type DonationButtonStyledProps = {
  mainColor: string;
  active: boolean;
};

const DonationButtonStyled = styled.button<DonationButtonStyledProps>`
  border-radius: 0.3rem;
  box-sizing: border-box;
  border-width: 0.3rem;
  border-style: solid;
  border-color: #fff;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  opacity: 0.8;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  color: #b0b0b0;
  background: rgba(0, 0, 0, 0.0625);

  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }

  ${props =>
    props.active &&
    `
    background-color: ${rgba(props.mainColor, 35)};
    color: ${props.mainColor};
  `}
`;

type Props = {
  active: boolean;
  value: string | number;
  label: string;
  mainColor: string;
  // recurring | unique
  paymentType: string;
  onClick: any;
};

const DonationButton: React.FC<Props> = ({
  active,
  label,
  mainColor,
  onClick,
  value,
  paymentType,
}) => (
  <DonationButtonStyled
    type="button"
    onClick={onClick}
    active={active}
    mainColor={mainColor}
  >
    {'R$ ' + value + (paymentType === 'recurring' ? ' /' : '') + label}
  </DonationButtonStyled>
);

DonationButton.defaultProps = {
  active: false,
};

export default DonationButton;
