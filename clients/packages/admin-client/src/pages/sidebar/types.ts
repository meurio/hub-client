export interface Mobilization {
  id: number;
  name: string;
  slug: string;
  status: string;
  goal: string;
  image?: string;
  created_at: string;
  header_font?: string;
  body_font?: string;
  color_scheme?: string;
}

export interface DNSHostedZone {
  id: number;
  domainName: string;
  hostedZone: any;
  delegationSet: any;
  ns_ok: boolean;
  status: string;
}

export interface SidebarContextValues {
  fetching: boolean;
  mobilizations: Mobilization[];
  dnsHostedZones: DNSHostedZone[];
  selectMobilization: (id: number) => void;
  mobilization?: Mobilization;
  changeStatus: (status: 'active' | 'archived') => void;
  refetch: any;
}