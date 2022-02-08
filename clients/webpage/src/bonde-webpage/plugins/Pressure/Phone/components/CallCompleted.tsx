import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.li`
  background-color: #00c08a;
`;

const Target = styled.div`
  & + .finish {
    text-transform: none;
  }
`;

const CallCompleted = ({
  name,
  duration,
  listKey,
}: {
  name: string;
  duration: string;
  listKey: string;
}) => {
  return (
    <Wrapper key={listKey}>
      <Target className="call-item">
        <i className="fa fa-phone-square" />
        <div>{name}</div>
      </Target>
      <Target className="finish">
        {duration}s
        <i className="fa fa-check-circle" />
      </Target>
    </Wrapper>
  );
};

export default CallCompleted;
