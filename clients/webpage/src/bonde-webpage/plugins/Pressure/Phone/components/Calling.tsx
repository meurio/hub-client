import React, { useState, useEffect } from 'react';

import styled from '@emotion/styled';

const RealtimeCallDuration = () => {
  const [duration, setDuration] = useState(0);
  const [interval, applyInterval] = useState<number | undefined>(undefined);

  const timer = () => setDuration(duration + 1);

  useEffect(() => {
    applyInterval(window.setInterval(timer, 1000));
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyInterval]);

  return <span>{`${duration}s`}</span>;
};

const Wrapper = styled.li`
  background-color: #ffd500;
`;

const Target = styled.div`
  &:first-child {
    margin-right: 0.3rem;
  }
  text-transform: none;
`;

const Caller = styled.div`
  display: grid;
  align-items': start;
`;

const Calling = ({
  listKey,
  name,
  status,
}: {
  listKey: string;
  name: string;
  status: string;
}) => {
  return (
    <Wrapper className="warning" key={listKey}>
      <Target className="call-item">
        <span className="fa fa-phone ring" />
        <Caller>
          <span>{name}</span>
          Chamada em andamento
        </Caller>
      </Target>
      <Target>{status === 'in-progress' && <RealtimeCallDuration />}</Target>
    </Wrapper>
  );
};

export default Calling;
