import React from 'react';
import styled from '@emotion/styled';
import copy from 'clipboard-copy';
import TellAFriendBase from '../../../components/ux/TellAFriendBase';
import IconCopy from './IconCopy';
import IconEye from './IconEye';

const Code = styled.code`
  padding: 16px 35px;
  background: #eee;
  color: #424242;
`;

type ButtonProps = {
  flat?: boolean;
};

const Button = styled.button<ButtonProps>`
  border-radius: 4px;
  border: 2px solid #ee0099;
  box-sizing: border-box;
  padding: 26px;
  cursor: pointer;
  text-weight: bold;
  text-transform: uppercase;

  background: ${props => (props.flat ? 'none' : '#EE0099')};
  color: ${props => (props.flat ? '#EE0099' : '#fff')};

  & > svg {
    margin: 0 11px -6px 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif;
  font-size: 18px;

  border-bottom: 1px solid #eeeeee;

  & > * {
    margin-bottom: 21px;
  }
`;

const Boleto = ({ donation, ...props }: any) => {
  const { boleto_barcode, boleto_url } = donation.gateway_data || {
    boleto_barcode: '23791.22928 60005.819721 18000.046906 6 83460000000500',
    boleto_url: 'http://localhost/boleto',
  };

  return (
    <TellAFriendBase
      {...props}
      message="Obrigada <3 Seu boleto já foi gerado:"
      render={() => (
        <Container>
          <Code>{boleto_barcode}</Code>
          <Button flat onClick={() => copy(boleto_barcode)}>
            <IconCopy /> Copiar código
          </Button>
          <Button onClick={() => window.open(boleto_url, '_target')}>
            <IconEye />
            Ver boleto
          </Button>
        </Container>
      )}
    />
  );
};

export default Boleto;
