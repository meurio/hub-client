import type { CertificateTLS, DNSHostedZone } from 'bonde-core-tools';
import getStatus from './getStatus';

describe('Domain getStatus', () => {
  const dns: DNSHostedZone = {
    id: 23,
    domain_name: 'bonde.org',
    status: 'created',
    community_id: 2,
    certificates: [],
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
    const certificate: CertificateTLS = {
      id: 12,
      domain: 'bonde.org',
      dns_hosted_zone_id: dns.id,
      community_id: dns.community_id,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    expect(getStatus({ ...dns, ns_ok: true, certificates: [certificate] })).toEqual({
      dns: 'propagated',
      certificate: 'active'
    });
  });

  it('should return a Status with certificate not verify', () => {
    const certificate: CertificateTLS = {
      id: 12,
      domain: 'bonde.org',
      dns_hosted_zone_id: dns.id,
      community_id: dns.community_id,
      is_active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    expect(getStatus({ ...dns, ns_ok: true, certificates: [certificate] })).toEqual({
      dns: 'propagated',
      certificate: 'pending'
    });
  });
});