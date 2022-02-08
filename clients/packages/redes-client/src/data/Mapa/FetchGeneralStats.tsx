import React, { useContext } from "react";
import { Context as SessionContext, useQuery, gql } from "bonde-core-tools";
import { zendeskOrganizations } from "../../services/utils";
import { GeneralStatsData, MapaGeneralStatsVars } from "../../types";

const WEEKLY_DATA = gql`
  query GeneralData($individualOrganizationId: bigint) {
    encaminhamentosRealizados: solidarity_tickets_aggregate(
      where: {
        organization_id: { _eq: $individualOrganizationId }
        status_acolhimento: { _eq: "encaminhamento__realizado" }
        status: { _neq: "deleted" }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: solidarity_tickets_aggregate(
      where: {
        organization_id: { _eq: $individualOrganizationId }
        status_acolhimento: { _eq: "atendimento__iniciado" }
        status: { _neq: "deleted" }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosConcluidos: solidarity_tickets_aggregate(
      where: {
        organization_id: { _eq: $individualOrganizationId }
        status_acolhimento: { _eq: "atendimento__concluído" }
        status: { _neq: "deleted" }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosInterrompidos: solidarity_tickets_aggregate(
      where: {
        organization_id: { _eq: $individualOrganizationId }
        status_acolhimento: { _eq: "atendimento__interrompido" }
        status: { _neq: "deleted" }
      }
    ) {
      aggregate {
        count
      }
    }
    aprovadas: solidarity_tickets_aggregate(
      where: {
        organization_id: { _neq: $individualOrganizationId }
        status_inscricao: { _eq: "aprovada_e_validada" }
      }
    ) {
      aggregate {
        count
      }
    }
    reprovadasEstudoDeCaso: solidarity_tickets_aggregate(
      where: {
        organization_id: { _neq: $individualOrganizationId }
        status_inscricao: { _eq: "reprovada_-_estudo_de_caso" }
      }
    ) {
      aggregate {
        count
      }
    }
    reprovadasDiretrizes: solidarity_tickets_aggregate(
      where: {
        organization_id: { _neq: $individualOrganizationId }
        status_inscricao: { _eq: "reprovada_-_diretrizes_do_mapa" }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const FetchGeneralStats = ({ children }: any) => {
  const variables = {
    individualOrganizationId: zendeskOrganizations["individual"],
  };

  const { loading, error, data } = useQuery<
    GeneralStatsData,
    MapaGeneralStatsVars
  >(WEEKLY_DATA, {
    variables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children(data);
};

export default function CheckCommunity(props: any = {}): React.ReactElement {
  const { community }: any = useContext(SessionContext);
  return <FetchGeneralStats community={community} {...props} />;
}

CheckCommunity.displayName = "CheckCommunityMatches";
