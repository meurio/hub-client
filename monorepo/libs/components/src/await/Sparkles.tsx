import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";

interface SparkProps {
  colorInit: string;
  d: string;
  duration: string;
  pulse: any;
}

const Spark = styled.path<SparkProps>`
  fill: ${props => props.colorInit};
  animation-name: ${props => props.pulse};
  animation-duration: ${props => props.duration};
  animation-iteration-count: infinite;
`;

interface SparklesProps {
  color: string;
  colorInit: string;
  duration: string;
}

const Sparkles: React.FC<SparklesProps> = ({ color, colorInit, duration }) => {
  return (
    <React.Fragment>
      <Spark
        colorInit={colorInit}
        duration={duration}
        pulse={keyframes`
          0%  { fill: ${color} }
          81% { fill: ${color} }
          82% { fill: ${colorInit} }
        `}
        d="M23,84H12.5c-1.7,0-3-1.4-3-3l0,0c0-1.7,1.4-3,3-3H23c1.7,0,3,1.4,3,3l0,0C26,82.7,24.6,84,23,84z"
      />
      <Spark
        colorInit={colorInit}
        duration={duration}
        pulse={keyframes`
          15% { fill: ${colorInit} }
          16% { fill: ${color} }
          81% { fill: ${color} }
          82% { fill: ${colorInit} }
        `}
        d="M36,35.1l7.4,7.4c1.2,1.2,3.1,1.2,4.3,0l0,0c1.2-1.2,1.2-3.1,0-4.3l-7.4-7.4c-1.2-1.2-3.1-1.2-4.3,0l0,0 C34.8,32,34.8,34,36,35.1z"
      />
      <Spark
        colorInit={colorInit}
        duration={duration}
        pulse={keyframes`
          31% { fill: ${colorInit} }
          32% { fill: ${color} }
          81% { fill: ${color} }
          82% { fill: ${colorInit} }
        `}
        d="M89.8,14.1v10.4c0,1.7-1.4,3-3,3l0,0c-1.7,0-3-1.4-3-3V14.1c0-1.7,1.4-3,3-3l0,0C88.4,11.1,89.8,12.5,89.8,14.1  z"
      />
      <Spark
        color={color}
        colorInit={colorInit}
        duration={duration}
        pulse={keyframes`
          47% { fill: ${colorInit} }
          48% { fill: ${color} }
          81% { fill: ${color} }
          82% { fill: ${colorInit} }
        `}
        d="M138.3,35.1l-7.4,7.4c-1.2,1.2-3.1,1.2-4.3,0v0c-1.2-1.2-1.2-3.1,0-4.3l7.4-7.4c1.2-1.2,3.1-1.2,4.3,0v0 C139.5,32,139.5,34,138.3,35.1z"
      />
      <Spark
        color={color}
        colorInit={colorInit}
        duration={duration}
        pulse={keyframes`
          63% { fill: ${colorInit} }
          64% { fill: ${color} }
          81% { fill: ${color} }
          82% { fill: ${colorInit} }
        `}
        d="M163,84h-10.4c-1.7,0-3-1.4-3-3l0,0c0-1.7,1.4-3,3-3H163c1.7,0,3,1.4,3,3l0,0C166,82.7,164.7,84,163,84z"
      />
    </React.Fragment>
  );
};

Sparkles.defaultProps = {
  colorInit: '#DBDBDB',
  color: '#35E3C3',
  duration: '6s',
};

export default Sparkles;
