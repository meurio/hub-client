import React from 'react';
import {
  HStack,
  Tag
} from 'bonde-components/chakra';
import getStatus from './getStatus';
import type { DNSHostedZone } from './types';

const StatusTags: React.FC<{ dnsHostedZone: DNSHostedZone }> = ({ dnsHostedZone }) => {
  const { dns, certificate } = getStatus(dnsHostedZone);

  return (
    <HStack>
      {dns === 'propagated' ? <Tag colorScheme="green">Propagado</Tag> : <Tag colorScheme="yellow">Propagando</Tag>}
      {certificate === 'active' ? <Tag colorScheme="green">Certificado</Tag> : <Tag colorScheme="yellow">Certificado pendente</Tag>}
    </HStack>
  );
}

export default StatusTags;