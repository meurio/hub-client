export interface Mobilization {
  id: number;
  name: string;
  slug: string;
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
  mobilizations: Mobilization[];
  dnsHostedZones: DNSHostedZone[];
  selectMobilization: (id: number) => void;
  mobilization?: Mobilization;
}