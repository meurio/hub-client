export type Community = {
  id: number
  name: string
}

export type Cerfificate = {
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
  certificates: Cerfificate[]
  dns_records: DNSRecord[]
}