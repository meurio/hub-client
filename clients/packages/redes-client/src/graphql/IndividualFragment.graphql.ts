import { gql } from "bonde-core-tools";

export const MAPA_INDIVIDUAL = gql`
  fragment individual on solidarity_users {
    id: user_id
    firstName: name
    email
    whatsapp
    phone
    zipcode: cep
    address
    city
    latitude
    longitude
    state
    availability: condition
    formEntryId: external_id
    tipoDeAcolhimento: tipo_de_acolhimento
    createdAt: data_de_inscricao_no_bonde
    encaminhamentosRealizados: encaminhamentos_realizados_calculado_
    atendimentosConcluidos: atendimentos_concludos_calculado_
    atendimentosEmAndamento: atendimentos_em_andamento_calculado_
    organizationId: organization_id
    updatedAt: updated_at
    registrationNumber: registration_number
    occupationArea: occupation_area
  }
`;

export const MAPA_TICKET_INDIVIDUAL = gql`
  fragment ticketIndividual on solidarity_tickets {
    ticketId: ticket_id
    individual {
      ...individual
    }
    subject
    relationshipStatus: status_acolhimento
    userStatus: status_inscricao
    externalId: external_id
  }
  ${MAPA_INDIVIDUAL}
`;

export const REDE_INDIVIDUAL = gql`
  fragment individual on rede_individuals {
    id
    firstName: first_name
    lastName: last_name
    email
    whatsapp
    phone
    zipcode
    address
    state
    coordinates
    availability
    formEntryId: form_entry_id
    userStatus: status
    createdAt: created_at
    updateAt: updated_at
    group {
      isVolunteer: is_volunteer
      settings
      name
    }
    extras
  }
`;
