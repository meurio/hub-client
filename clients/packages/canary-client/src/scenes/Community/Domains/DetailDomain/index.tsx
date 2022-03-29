import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Stack } from "bonde-components/chakra";
import NameServers from '../NameServers';
import { DNSHostedZone } from '../types';
import getStatus from '../getStatus';
// Scene components
import Navigation from './Navigation';
import Domain from './Domain';
import Explain from './Explain';
import Records from './Records';

type Props = {
  refetch: any
  dnsHostedZones: DNSHostedZone[]
}

const DetailDomain: React.FC<Props> = ({ dnsHostedZones, refetch }) => {
  const { hostedZoneId }: any = useParams();
  const dnsHostedZone = dnsHostedZones.filter((hZ: any) => hZ.id === Number(hostedZoneId))[0];

  if (!dnsHostedZone) return <Redirect to='/community/domains' />

  const { dns } = getStatus(dnsHostedZone);

  return (
    <Stack direction="column" spacing={8}>
      <Navigation dnsHostedZone={dnsHostedZone} refetch={refetch} />
      <Domain
        refetch={refetch}
        dnsHostedZone={dnsHostedZone}
        dnsIsActivated={dns === 'propagated'}
      />
      <Explain
        dnsHostedZone={dnsHostedZone}
        dnsIsActivated={dns === 'propagated'}
      />
      {dns === 'propagated' && (
        <Records dnsHostedZone={dnsHostedZone} refetch={refetch} />
      )}
      <NameServers dnsHostedZone={dnsHostedZone} />
    </Stack>
  )
}

export default DetailDomain;