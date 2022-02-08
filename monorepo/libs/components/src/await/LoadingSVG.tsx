import React from 'react';
import styled from '@emotion/styled';
import Sparkles from './Sparkles';

export interface LoadingSVGProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
  color?: string;
  sparklesColor?: string;
  sparklesColorInit?: string;
  sparklesDuration?: string;
}

/**
 * Animated loading transition component.
 */
const LoadingSVG = styled((props: LoadingSVGProps) => {
  const {
    className,
    color = '#050505',
    sparklesColor = '#35E3C3',
    sparklesColorInit = '#DBDBDB',
    sparklesDuration = '6s',
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 176 135"
    >
      <path
        fill={color}
        d="M129.7,123.3H43.8c-1.1,0-2-0.9-2-2V119c0-1.1,0.9-2,2-2h85.9c1.1,0,2,0.9,2,2v2.3C131.7,122.4,130.8,123.3,129.7,123.3z"
      />
      <path
        fill={color}
        d="M117,68.2c-12.7,0-15.2,0-15.2,0v-4h-12L96,58v-4.7l-6.6-6.6c0,0-2.6-2.3-4.9,0s-5.9,5.9-5.9,5.9v4.7l7,7H73.2 v3.8H55.5c0,0-13.7-0.2-13.7,13.5v21c0,0-1.2,5.4,10.5,6.4c0.8,3.2,3.9,5.6,7.7,5.6c3.7,0,6.8-2.3,7.7-5.4c0.6,0,1.1,0,1.7,0  c0.9,3.1,4,5.4,7.7,5.4s6.8-2.3,7.7-5.4c2.5,0,5.1,0,7.7,0c0.9,3.1,4,5.4,7.7,5.4s6.8-2.3,7.7-5.4c0.6,0,1.2,0,1.7,0  c0.9,3.1,4,5.4,7.7,5.4c3.7,0,6.8-2.4,7.7-5.5c1.2-0.5,6.9-2.9,6.9-8.9c0-6.7,0-26.5,0-26.5S129.7,68.2,117,68.2z M70.3,75.8  c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2H72.3c-1.1,0-2-0.9-2-2V75.8z M50.8,90.5v-11c2-5.3,6.3-5.7,6.3-5.7 s0,0,4,0s3.8,2,3.8,2s0,4,0,11.2c0,5.7-1.6,6.2-1.6,6.2s-5.4,0-8.9,0S50.8,90.5,50.8,90.5z M60,111.6c-2,0-3.7-1-4.4-2.4  c0.1,0,0.3,0,0.4,0c2.2,0,5.1,0,8.4,0C63.7,110.6,62,111.6,60,111.6z M77,111.6c-2,0-3.6-1-4.4-2.4c2.8,0,5.8,0,8.9,0 C80.7,110.6,79,111.6,77,111.6z M109.2,75.8c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2h-10.3c-1.1,0-2-0.9-2-2 V75.8z M89.8,91.2V75.8c0-1.1,0.9-2,2-2h10.3c1.1,0,2,0.9,2,2v15.3c0,1.1-0.9,2-2,2H91.8C90.7,93.2,89.8,92.3,89.8,91.2z M100,111.6 c-2,0-3.6-1-4.4-2.4c3.1,0,6,0,8.9,0C103.6,110.6,102,111.6,100,111.6z M117.1,111.6c-2,0-3.6-1-4.4-2.4c3.7,0,6.8,0,8.9,0  C120.7,110.6,119,111.6,117.1,111.6z"
      />
      <Sparkles
        color={sparklesColor}
        colorInit={sparklesColorInit}
        duration={sparklesDuration}
      />
    </svg>
  );
})`
  ${props =>
    props.size === 'small' &&
    `
    width: calc(0.5*176px);
    height: calc(0.5*135px);
  `}
  ${props =>
    props.size === 'default' &&
    `
    width: calc(0.75*176px);
    height: calc(0.75*135px);
  `}
  ${props =>
    props.size === 'large' &&
    `
    width: calc(1*176px);
    height: calc(1*135px);
  `}
`;

export default LoadingSVG;
