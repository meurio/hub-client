import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import styled from "styled-components";
import { Loading } from "bonde-components";

import { CheckCommunity } from "../../components";
import { REDE_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";
import { useFilterState } from "../../services/FilterProvider";
import { addDistance } from "../../services/utils";
import { Individual } from "../../types";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const INDIVIDUALS_FOR_MATCH = gql`
  query IndividualsForMatch(
    $isVolunteer: Boolean_comparison_exp
    $context: Int_comparison_exp!
  ) {
    individuals: rede_individuals(
      where: {
        status: { _eq: "aprovada" }
        availability: { _eq: "disponível" }
        group: { is_volunteer: $isVolunteer, community_id: $context }
        email: { _is_null: false }
        first_name: { _is_null: false }
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
      }
      order_by: { created_at: asc }
    ) {
      ...individual
    }
  }
  ${REDE_INDIVIDUAL}
`;

type Props = {
  children: any;
  group: { isVolunteer: boolean };
  community: {
    id: number;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
};

export type IndividualsData = {
  individuals: Array<Individual>;
  individualsCount: {
    aggregate: {
      count: number;
    };
  };
};

type IndividualsVars = {
  isVolunteer: { _eq: boolean };
  context: {
    _eq: number;
  };
};

const FetchIndividualsForMatch = ({
  children,
  group: { isVolunteer },
  community,
  coordinates
}: Props) => {
  const { rows, offset } = useFilterState();
  const { loading, error, data } = useQuery<IndividualsData, IndividualsVars>(
    INDIVIDUALS_FOR_MATCH,
    {
      variables: {
        isVolunteer: {
          _eq: !isVolunteer,
        },
        context: {
          _eq: community && community.id
        }
      },
    }
  );

  if (loading)
    return (
      <WrapLoading>
        <Loading />
      </WrapLoading>
    );
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  const addDistanceToData = addDistance(coordinates, data?.individuals)

  return children({
    data: addDistanceToData.slice(offset, (rows + offset)),
    count: data?.individuals.length,
  });
};

FetchIndividualsForMatch.displayName = "FetchIndividualsForMatch";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchIndividualsForMatch} {...props} />;
}
