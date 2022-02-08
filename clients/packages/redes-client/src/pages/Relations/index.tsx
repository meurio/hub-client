import React from "react";
import styled from "styled-components";
import { Header, Empty, Stack } from "bonde-components";

import { useFilter } from "../../services/FilterProvider";
import { Table, Filters } from "../../components";
import {
  deconstructAgent,
  MAPA_DO_ACOLHIMENTO_COMMUNITY,
} from "../../services/utils";
import { Groups, MatchesData, Columns } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  community?: { id: number };
  groups: Groups;
  data: {
    FetchMatches: ({
      children,
    }: {
      children: (data: MatchesData) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
    ColumnsRelations: (
      groups: Groups,
      FilterOptions: {
        [x: string]: { label: string; value: string | number }[];
      }
    ) => Array<Columns>;
  };
};

export default function Relations({
  data: { FetchMatches, FilterOptions, ColumnsRelations },
  community,
  groups,
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();

  const save = async (values: any) => {
    // This needs to be done because when the text input is cleaned, it doesn't come as an `undefined` value, it's just not present and the previous state is maintained in the provider. Because of that, every time we dispatch the newValues, we need to clear them first.
    dispatch({ type: "relationships", value: values });
    return dispatch({ type: "page", value: 0 });
  };

  return (
    <Stack direction="column" spacing={4} mb={4}>
      <Filters
        save={save}
        options={FilterOptions}
        initialValues={state.relationships}
        searchPlaceholder="Buscar nome, email..."
        search
        state
        agent
        relationshipStatus
      />
      <FetchMatches>
        {({
          relationships,
          relationshipsCount: {
            aggregate: { count },
          },
        }) => {
          return count < 1 ? (
            <WrapEmpty>
              <Empty message="Nada por aqui..." />
            </WrapEmpty>
          ) : groups.length < 2 ? (
            <WrapEmpty>
              <Empty message="Não existem grupos suficientes nessa comunidade." />
            </WrapEmpty>
          ) : (
            <Stack spacing={2}>
              <Header.H4>Total ({count})</Header.H4>
              <Table
                // A query que carrega os matches do Mapa do Acolhimento
                // não considera o preenchimento de um agent como objeto
                // e sim como um valor número que é definido como o agent_id
                data={
                  community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
                    ? deconstructAgent(relationships)
                    : relationships
                }
                columns={ColumnsRelations(groups, FilterOptions)}
                sticky="end"
                totalResults={count}
              />
            </Stack>
          );
        }}
      </FetchMatches>
    </Stack>
  );
}

Relations.displayName = "Relations";
