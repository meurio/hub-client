export type Agent = {
  id: number;
  firstName: string;
  lastName: string;
}

export type IndividualPart = {
  firstName: string;
  organizationId: number;
  id: number;
  state: string;
  phone: string | null;
  whatsapp: string | null;
}

export interface Relation <T = IndividualPart, S = number> {
  individualsTicketId: number;
  volunteersTicketId: number;
  status: string;
  createdAt: number;
  recipientTicket: {
    agentId: number;
  };
  volunteer: T;
  recipient: T;
  agent?: S;
}

export type Relationships = Array<Relation>;

export type MatchesData = {
  relationships: Relationships;
  relationshipsCount: {
    aggregate: {
      count: number;
    };
  };
};

export type MapaMatchVariables = {
  input: {
    recipient: {
      external_id: string | null;
      nome_msr: string;
      ticket_id: number;
      organization_id: number;
      requester_id: number;
    };
    agent?: number;
    volunteer: {
      name: string;
      user_id: number;
      organization_id: number;
      registration_number: string;
      phone: string;
      whatsapp: string;
    };
    community_id: number;
  };
};

export type RedesMatchVariables = {
  input: {
    recipient_id: number;
    volunteer_id: number;
    status: string;
  };
  recipientId: number;
  volunteerId: number;
};