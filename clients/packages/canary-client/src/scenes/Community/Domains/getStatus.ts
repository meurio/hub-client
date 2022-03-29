import type { DNSHostedZone } from './types';

interface Status {
  dns: 'created' | 'propagating' | 'propagated';
  certificate: 'pending' | 'active';
}

const getStatus = (dns: DNSHostedZone): Status => {
  return {
    dns: !dns.ns_ok ? dns.status : 'propagated',
    certificate: dns.certificates[0]?.is_active ? 'active' : 'pending'
  }
}

export default getStatus;