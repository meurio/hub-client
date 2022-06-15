import React from 'react';
import { chakra } from 'bonde-components';
import getStatus from './getStatus';
import type { DNSHostedZone } from './types';
const {
  HStack,
  Tag
} = chakra;

const StatusTags: React.FC<{ dnsHostedZone: DNSHostedZone }> = ({ dnsHostedZone }) => {
  const { dns, certificate } = getStatus(dnsHostedZone);

  if (dns === 'created') {
    return <Tag colorScheme="red">Configuração pendente</Tag>;
  }

  return (
    <HStack>
      {dns === 'propagated' ? <Tag colorScheme="green">Propagado</Tag> : <Tag colorScheme="yellow">Propagando</Tag>}
      {certificate === 'active' ? <Tag colorScheme="green">Certificado</Tag> : <Tag colorScheme="yellow">Certificado pendente</Tag>}
    </HStack>
  );
}

export default StatusTags;