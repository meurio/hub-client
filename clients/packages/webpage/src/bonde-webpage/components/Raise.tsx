import React from 'react';
import styled from '@emotion/styled';

type Props = {
  message: string;
  classes: string;
  styles?: Record<string, string>;
};

const Wrap = styled.div`
  background-color: rgb(249, 202, 206);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0 3px 3px 0;
  border-color: #ff4136;
  border-width: 8px;
  border-left-style: solid;
  & > p {
    font-family: inherit;
    color: #ff4136;
    font-weight: bold;
  }
`;

const Raise = ({ message, classes, styles }: Props) => (
  <Wrap className={classes} style={{ ...styles }}>
    <p>{message}</p>
  </Wrap>
);

Raise.defaultProps = {
  classes: '',
};

export default Raise;
