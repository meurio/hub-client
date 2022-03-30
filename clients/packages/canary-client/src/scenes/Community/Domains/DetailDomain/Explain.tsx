import React from 'react';
import { Stack } from 'bonde-components/chakra';
import DomainsSteps from './DomainSteps';
import { DNSHostedZone } from '../types';
import { MainTitle } from '../Styles';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
}

const Explain: React.FC<Props> = ({ dnsHostedZone, dnsIsActivated }) => {
  return (
    <Stack direction="column" spacing={2}>
      <MainTitle>
        {!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}
      </MainTitle>
      <DomainsSteps dnsHostedZone={dnsHostedZone} />
    </Stack>
  );
}

export default Explain;
