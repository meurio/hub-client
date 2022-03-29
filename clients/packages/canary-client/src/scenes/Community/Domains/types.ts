export type Community = {
  id: number
  name: string
}

export type Certificate = {
  is_active: boolean
}

export type DNSRecord = {
  id: number
  name: string
  value: string
  record_type: string
  comment?: string
  ttl: number
}

export type DNSHostedZone = {
  id: number
  community: Community
  comment?: string
  domain_name: string
  ns_ok?: boolean
  status: 'created' | 'propagating' | 'propagated'
  hosted_zone: any
  name_servers: string[]
  certificates: Certificate[]
  dns_records: DNSRecord[]
  created_at: string;
  updated_at: string;
}