import React from 'react';

import styled from '@emotion/styled';
import { Button as Btn } from '../../../../components/forms';

const Button = styled(Btn as any)`
  && {
    border-radius: 2px;
    width: 100%;
  }
`;
const Wrapper = styled.div`
  margin: 1rem 0;
`;
const FinishButton = ({
  toggleFinishMessage,
}: {
  toggleFinishMessage: any;
  buttonColor?: any;
}) => {
  // console.log('FinishButton', buttonColor);
  return (
    <Wrapper>
      <Button
        type="button"
        onClick={(e: any) => {
          e.preventDefault();
          return toggleFinishMessage(true);
        }}
      >
        Encerrar e compartilhar
      </Button>
    </Wrapper>
  );
};

export default FinishButton;
