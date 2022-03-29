import React from 'react';
import { Stack, Text } from 'bonde-components/chakra';
import DomainsSteps from './DomainSteps';
import { DNSHostedZone } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
}

const Explain: React.FC<Props> = ({ dnsHostedZone, dnsIsActivated }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Text fontWeight="semibold" fontSize="13px" textTransform="uppercase">
        {!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}
      </Text>
      <DomainsSteps dnsHostedZone={dnsHostedZone} />
    </Stack>
  );
}

export default Explain;
