import type { Certificate, DNSHostedZone } from './types';
import getStatus from './getStatus';

describe('Domain getStatus', () => {
  const dns: DNSHostedZone = {
    id: 23,
    domain_name: 'bonde.org',
    status: 'created',
    community: {
      id: 2,
      name: 'Test'
    },
    certificates: [],
    hosted_zone: {},
    name_servers: [],
    dns_records: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  it('should return a first Status to check DNS', () => {
    expect(getStatus(dns)).toEqual({
      dns: 'created',
      certificate: 'pending'
    });
  });

  it('should return a Status with propagating', () => {
    expect(getStatus({ ...dns, status: 'propagating' })).toEqual({
      dns: 'propagating',
      certificate: 'pending'
    });
  });

  it('should return a Status with propagated', () => {
    expect(getStatus({ ...dns, ns_ok: true })).toEqual({
      dns: 'propagated',
      certificate: 'pending'
    });
  });

  it('should return a Status with certificated', () => {
    const certificate: Certificate = {
      is_active: true
    }

    expect(getStatus({ ...dns, ns_ok: true, certificates: [certificate] })).toEqual({
      dns: 'propagated',
      certificate: 'active'
    });
  });

  it('should return a Status with certificate not verify', () => {
    const certificate: Certificate = {
      is_active: false
    }

    expect(getStatus({ ...dns, ns_ok: true, certificates: [certificate] })).toEqual({
      dns: 'propagated',
      certificate: 'pending'
    });
  });
});