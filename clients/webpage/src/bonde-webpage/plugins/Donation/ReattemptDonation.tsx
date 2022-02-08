import React from 'react';
import styled from '@emotion/styled';
import ReattemptIcon from './ReattemptIcon';

type ReattemptDonationStylesProps = {
  mainColor: string;
};

const ReattemptDonationStyles = styled.div<ReattemptDonationStylesProps>`
  padding: 3rem;

  p {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
  }

  button {
    background-color: ${props => props.mainColor};
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    margin: 3rem 0 0;
    padding: 1em;
    border: 0;
    border-radius: 3px;
    color: #fff;
    text-transform: uppercase;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
  }

  svg {
    margin-bottom: 1rem;
  }
`;

type Props = {
  headerFont: string;
  mainColor: string;
  handleClickDonate: any;
};

const ReattemptDonation = ({
  headerFont,
  mainColor,
  handleClickDonate,
}: Props) => {
  return (
    <>
      <h2 style={{ fontFamily: headerFont }}>Ops!</h2>
      <ReattemptDonationStyles mainColor={mainColor}>
        <ReattemptIcon />
        <p>Algo de errado aconteceu com a sua doação. ):</p>
        <p>Clique no botão abaixo pra tentar de novo.</p>
        <button type="button" onClick={handleClickDonate}>
          <span>Nova tentativa</span>
        </button>
      </ReattemptDonationStyles>
    </>
  );
};

export default ReattemptDonation;
