import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.li`
  background-color: #c20000;
`;

const Target = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  & + .finish {
    text-transform: none;
  }
`;

const CallFailed = ({ listKey, name }: { listKey: string; name: string }) => {
  return (
    <Wrapper key={listKey}>
      <Target>
        <span className="fa fa-phone-square" />
        {name}
      </Target>
      <Target className="finish">
        3x
        <span className="fa fa-times-circle" />
      </Target>
    </Wrapper>
  );
};

export default CallFailed;
