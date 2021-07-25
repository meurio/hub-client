import React, { useState, useEffect } from "react";
import { css } from "styled-components/macro";
import { Button, Header, Text, Empty } from "bonde-components";
import { useMutation, useSession } from "bonde-core-tools";
import { useLocation, useHistory } from "react-router-dom";

import { Table, Popup } from "../components";
import { useSelectedGroup } from "../hooks";
import { useFilter } from "../services/FilterProvider";
import { getMatchGroup } from "../services/utils";
import { Columns, Groups, Individual } from "../types";

type Props = {
  groups: Groups;
  data: {
    FetchIndividualsForMatch: ({
      children,
      showAllAvailable,
    }: {
      children: (data: any) => React.ReactElement;
      showAllAvailable: boolean;
    }) => React.ReactElement | null;
    CreateRelationship: any;
    ColumnsMatch: (
      setIndividual: (individual: any) => void,
      setModal: (value: boolean) => void,
      isVolunteerSelected?: boolean
    ) => Array<Columns>;
  };
};

export default function Match({
  data: { FetchIndividualsForMatch, ColumnsMatch, CreateRelationship },
  groups,
}: Props): React.ReactElement {
  const [createRelationship, { loading }] = useMutation(CreateRelationship);
  const { user, community } = useSession();
  const [isOpen, setModal] = useState<boolean>(false);
  const [showAllAvailable, setAllAvailable] = useState<boolean>(true);
  const [selectedGroup, isVolunteerSelected] = useSelectedGroup();
  const [state, dispatch] = useFilter();
  const { state: linkState } = useLocation();
  const { goBack } = useHistory();

  const selectedIndividual: Individual = linkState as unknown as Individual;

  const matchGroup = getMatchGroup(groups, selectedIndividual);

  useEffect(() => {
    dispatch({
      type: "match",
      value: {
        [isVolunteerSelected ? "volunteer" : "recipient"]: {
          ...(linkState as Individual),
          group: selectedGroup,
        },
      },
    });
    dispatch({ type: "rows", value: 30 });
  }, [dispatch, isVolunteerSelected, linkState, selectedGroup]);

  return (
    <>
      <div
        css={css`
          & > button {
            padding: 0;
          }
        `}
      >
        <Button secondary align="left" onClick={goBack}>
          {"< voltar"}
        </Button>
      </div>
      <FetchIndividualsForMatch
        showAllAvailable={showAllAvailable}
        {...selectedIndividual}
      >
        {({ data, count }) => {
          return count < 1 ? (
            <div
              css={css`
                height: 100%;
                & > div {
                  height: 100%;
                }
              `}
            >
              <Empty
                message={`Ops! Não encontramos nenhum resultado para essa busca. Confira na lista de ${matchGroup} se há pessoas disponíveis para fazer o match.`}
              />
            </div>
          ) : (
            <div
              css={css`
                & > ${Header.H4} {
                  margin: 15px 0 10px;
                }
                & > ${Text} {
                  margin-top: 0;
                }
              `}
            >
              <div>
                <Header.H4>Match Realizado!</Header.H4>
                <label>
                  Mostrar todas as voluntárias disponíveis
                  <input
                    type="checkbox"
                    defaultChecked={showAllAvailable}
                    onChange={() =>
                      setAllAvailable((prevChecked) => !prevChecked)
                    }
                  />
                </label>
              </div>
              <Text>
                {count} {matchGroup} próximas de {selectedIndividual.firstName}
              </Text>
              <Table
                data={data}
                columns={ColumnsMatch(dispatch, setModal, !isVolunteerSelected)}
                sticky="end"
                totalResults={count}
              />
            </div>
          );
        }}
      </FetchIndividualsForMatch>
      <Popup
        isOpen={isOpen}
        match={state.match}
        setModal={setModal}
        createRelationship={createRelationship}
        user={user}
        community={community}
        loading={loading}
      />
    </>
  );
}
