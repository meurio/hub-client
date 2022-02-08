import React, { useEffect } from "react";
import styled from "styled-components";
import { Header, Empty, Stack } from "bonde-components";

import { Table, Filters } from "../../components";
import BtnSearchMatch from "./scenes/BtnSearchMatch";

import { useFilter } from "../../services/FilterProvider";
import useSelectedGroup from "../../hooks/useSelectedGroup";
import {
  groupsToSelect,
  MAPA_DO_ACOLHIMENTO_COMMUNITY,
  stripIndividualFromData,
} from "../../services/utils";
import {
  Individual,
  Groups,
  MapaIndividualTicket,
  Columns,
  valueAndRow,
} from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type Props = {
  community?: {
    id: number;
  };
  groups: Groups;
  data: {
    FetchIndividuals: ({
      children,
    }: {
      children: (data: {
        data: Individual[];
        individualsCount: {
          aggregate: {
            count: number;
          };
        };
      }) => React.ReactElement;
    }) => React.ReactElement | null;
    FilterOptions: {
      [x: string]: { label: string; value: string | number }[];
    };
    ColumnsIndividuals: (
      FilterOptions: {
        [x: string]: { label: string; value: string | number }[];
      },
      isVolunteerSelected?: boolean
    ) => Array<Columns>;
  };
};

export default function Individuals({
  data: { FetchIndividuals, FilterOptions, ColumnsIndividuals },
  community,
  groups,
}: Props): React.ReactElement {
  const [state, dispatch] = useFilter();
  const [,isVolunteerSelected] = useSelectedGroup();
  useEffect(() => {
    // if state.selectedGroup is null, we shouldn't change the state - the user that cleaned it
    if (
      (typeof state.selectedGroup === "undefined" ||
      state.selectedGroup?.value === 0) && groups.length > 0
    )
      return dispatch({
        type: "group",
        value: {
          value: groups.find((group) => !group.isVolunteer)?.id || 0,
          label: groups.find((group) => !group.isVolunteer)?.name || "",
        },
      });
  }, [state.selectedGroup, dispatch, groups]);

  const save = async (values: any) => {
    dispatch({ type: "individuals", value: values });
    return dispatch({ type: "page", value: 0 });
  };

  return (
    <Stack direction="column" spacing={4} mb={4}>
      <Filters
        save={save}
        onGroupChange={(e) => dispatch({ type: "group", value: e })}
        options={{
          ...FilterOptions,
          groups: groupsToSelect(groups),
        }}
        initialValues={{
          ...state.individuals,
          groups: state.selectedGroup,
        }}
        searchPlaceholder={
          community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
            ? "Buscar nome, email, especialidade..."
            : "Buscar nome, email..."
        }
        groups
        search
        state
        availability
        userStatus={
          community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
            ? isVolunteerSelected
            : true
        }
        relationshipStatus={
          !isVolunteerSelected &&
          community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
        }
      />
      <FetchIndividuals>
        {({
          data,
          individualsCount: {
            aggregate: { count },
          },
        }) => {
          const originalColumns = ColumnsIndividuals(
            FilterOptions,
            isVolunteerSelected
          );
          const dynamicColumns = {
            Header: "Extras",
            style: {
              borderLeft: "1px solid #e5e5e5",
            },
            columns:
              count > 0 && data && data[0] && data[0].extras
                ? Object.keys(data[0].extras).map((e: any) => ({
                    accessor: `extras.${e}`,
                    Header: e,
                    // eslint-disable-next-line react/display-name
                    Cell: (props: any): JSX.Element | string => (
                      <span>{props.value || "-"}</span>
                    ),
                  }))
                : [],
          };
          // insert sticky button after extras columns
          const action = {
            accessor: "phone",
            Header: "Ação",
            className: "sticky",
            width: 200,
            // eslint-disable-next-line react/display-name
            Cell: ({ row: { original } }: valueAndRow): React.ReactElement => (
              <BtnSearchMatch original={original} />
            ),
          };
          const columnsWithDynamiContent = [
            ...originalColumns,
            ...[dynamicColumns],
            ...[action],
          ];

          return count < 1 ? (
            <WrapEmpty>
              <Empty message="Nada por aqui..." />
            </WrapEmpty>
          ) : groups.length < 2 ? (
            <WrapEmpty>
              <Empty message="Não existem grupos suficientes nessa comunidade." />
            </WrapEmpty>
          ) : (
            <>
              <Header.H4>Total ({count})</Header.H4>
              <Table
                data={
                  community?.id === MAPA_DO_ACOLHIMENTO_COMMUNITY
                    ? stripIndividualFromData(
                        (data as unknown) as MapaIndividualTicket[]
                      )
                    : data
                }
                columns={columnsWithDynamiContent}
                sticky="end"
                totalResults={count}
              />
            </>
          );
        }}
      </FetchIndividuals>
    </Stack>
  );
}

Individuals.displayName = "Individuals";
