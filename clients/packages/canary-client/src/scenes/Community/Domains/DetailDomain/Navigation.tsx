import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Header, Icon, Flex } from 'bonde-components';
import { DNSHostedZone } from '../types';
import RecordModal from './RecordModal';

const LinkStyled = styled(Link)`
  display: flex;
  text-transform: uppercase;
`

type Props = {
  dnsHostedZone: DNSHostedZone
  refetch: any
}

const Navigation = ({ dnsHostedZone, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const disabled = (dnsHostedZone.status === 'created' || dnsHostedZone.status === 'propagating') && !dnsHostedZone.ns_ok

  return (
    <>
      <Flex direction="row" justify="space-between">
        <LinkStyled to='/community/domains'>
          <Icon name='ArrowLeft' size='small' />
          <Header.H5>Detalhes do domínio</Header.H5>
        </LinkStyled>
        <Button disabled={disabled} onClick={() => setOpen(true)}>Adicionar registro</Button>
      </Flex>
      <RecordModal
        refetch={refetch}
        dnsHostedZone={dnsHostedZone}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default Navigation;