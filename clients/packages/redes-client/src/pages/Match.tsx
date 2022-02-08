import React, { useContext, useState, useEffect } from "react";
import { Button, Header, Text, Empty, Stack, Flex } from "bonde-components";
import { useMutation, Context as SessionContext } from "bonde-core-tools";
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
    }: {
      children: (data: any) => React.ReactElement;
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
  data: {
    FetchIndividualsForMatch,
    ColumnsMatch,
    CreateRelationship,
  },
  groups,
}: Props): React.ReactElement {
  const [createRelationship, { loading }] = useMutation(CreateRelationship);
  const { currentUser: user, community }: any = useContext(SessionContext)
  const [isOpen, setModal] = useState<boolean>(false);
  const [selectedGroup, isVolunteerSelected] = useSelectedGroup();
  const [state, dispatch] = useFilter();
  const { state: linkState } = useLocation();
  const { goBack } = useHistory();

  const selectedIndividual: Individual = (linkState as unknown) as Individual;

  const matchGroup = getMatchGroup(groups, selectedIndividual);

  useEffect(() => {
    dispatch({
      type: "match",
      value: {
        [isVolunteerSelected
          ? "volunteer"
          : "recipient"]: {
            ...linkState as Individual,
            group: selectedGroup
          },
      },
    });
    dispatch({ type: "rows", value: 30 });
  }, [dispatch, isVolunteerSelected, linkState, selectedGroup]);

  return (
    <Stack direction="column" spacing={4}>
      <Flex direction="row" align="flex-start">
        <Button variant="link" colorScheme="gray" onClick={goBack}>
          {"< voltar"}
        </Button>
      </Flex>
      <FetchIndividualsForMatch {...selectedIndividual}>
        {({ data, count }) => {
          return count < 1 ? (
            <Stack>
              <Empty
                message={`Ops! Não encontramos nenhum resultado para essa busca. Confira na lista de ${matchGroup} se há pessoas disponíveis para fazer o match.`}
              />
            </Stack>
          ) : (
            <Stack>
              <Header.H4>Match Realizado!</Header.H4>
              <Text>
                {count} {matchGroup} próximas de {selectedIndividual.firstName}
              </Text>
              <Table
                data={data}
                columns={ColumnsMatch(dispatch, setModal, !isVolunteerSelected)}
                sticky="end"
                totalResults={count}
              />
            </Stack>
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
    </Stack>
  );
}
