import React, { useContext } from "react";
import { Context as SessionContext, useQuery, gql } from "bonde-core-tools";
import { GeneralStatsData, RedesGeneralStatsVars } from "../../types";

const WEEKLY_DATA = gql`
  query GeneralData($context: Int_comparison_exp) {
    encaminhamentosRealizados: rede_relationships_aggregate(
      where: {
        status: { _eq: "encaminhamento_realizado" }
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: rede_relationships_aggregate(
      where: {
        status: { _eq: "atendimento_iniciado" }
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosConcluidos: rede_relationships_aggregate(
      where: {
        status: { _eq: "atendimento_concluído" }
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosInterrompidos: rede_relationships_aggregate(
      where: {
        status: { _eq: "atendimento_interrompido" }
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    aprovadas: rede_individuals_aggregate(
      where: {
        status: { _eq: "aprovada" }
        group: { community_id: $context, is_volunteer: { _eq: false } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  children: any;
  community: {
    id: number;
  };
};

const FetchGeneralStats = ({ children, community }: Props) => {
  const variables = {
    context: {
      _eq: community.id,
    },
  };

  const { loading, error, data } = useQuery<
    GeneralStatsData,
    RedesGeneralStatsVars
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
