import React from 'react';
import CountUp from 'react-countup';
import styled from '@emotion/styled';

type WrapperProps = {
  fontFamily?: string;
  shadow?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  font-family: ${props => props.fontFamily || 'inherit'};

  ${props =>
    props.shadow &&
    `
    box-shadow: rgb(227, 224, 227) 0px 15px 18px -10px inset;
    background-color: #fff;
    display: grid;
    justify-items: center;
    padding: 2rem;
    border-radius: 0 0 3px 3px;
  `}

  ${props =>
    !props.shadow &&
    `
    display: flex;
    flex-direction: row;
    padding: 1rem;
    justify-content: center;
  `}

  & > div {
    transition: left 0.5s ease;
  }
`;

const Title = styled.h1<{ color: string; shadow?: boolean }>`
  color: ${props => props.color}!important;
  font-weight: 300;
  font-size: 2.15rem;
  margin: 15px 0;
  font-family: inherit;

  ${props =>
    !props.shadow &&
    `
    font-size: 1.25rem;
    margin: 0 5px;
    color: #fff!important;
    font-weight: normal;
  `}
`;

const Subtitle = styled.h3<{ shadow?: boolean }>`
  color: #111 !important;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
  text-align: center;

  ${props =>
    !props.shadow &&
    `
    font-weight: normal;
    color: #fff!important;
  `}
`;

type Props = {
  value: number;
  color: string;
  text: string;
  startCounting: boolean;
  fontFamily?: string;
  shadow?: boolean;
};

const Count = ({
  value,
  color,
  text,
  startCounting,
  fontFamily,
  shadow,
}: Props) => {
  return (
    <Wrapper fontFamily={fontFamily} shadow={shadow}>
      <Title color={color} shadow={shadow}>
        <CountUp
          start={0}
          end={!isNaN(value) && startCounting ? Number(value) : value}
          duration={5}
        />
      </Title>
      <Subtitle shadow={shadow}>{text}</Subtitle>
    </Wrapper>
  );
};

Count.defaultProps = {
  value: 0,
  startCounting: false,
  shadow: false,
};

export default Count;
