import React from "react";
import { css } from "styled-components/macro";
import { useMutation } from "bonde-core-tools";
import {
  Button,
  ConnectedForm,
  Header,
  Text,
  TextareaField,
  Validators,
  Card,
  Hint,
  Success,
  toast,
  Stack,
  Flex,
  Grid,
  GridItem
} from "bonde-components";

import UPDATE_GROUPS from "../../../graphql/UpdateGroups";
import { Tip } from ".";
import { Groups } from "../../../types";

const MatchSettings = ({
  groups,
}: {
  groups: Groups;
}): React.ReactElement => {
  const { required } = Validators;
  const [saveSettings, { error }] = useMutation(UPDATE_GROUPS);
  const initialValues = {
    input: {
      whatsapp: groups.reduce(
        (o, group) => ({
          ...o,
          [group.name.toLowerCase().split(" ").join("_")]:
            group.settings?.communication?.whatsapp || "",
        }),
        {}
      ),
    },
  };

  const onSubmit = async (values: {
    input: { whatsapp: Record<string, string> };
  }) => {
    const {
      input: { whatsapp },
    } = values;
    try {
      const newMsgs = Object.keys(whatsapp).map((i) => {
        const group = groups.find(
          (g) => g.name.toLowerCase().split(" ").join("_") === i
        );
        return {
          redeGroupId: { _eq: group?.id },
          updatedSettings: {
            communication: {
              whatsapp: `${whatsapp[i]}`,
            },
          },
        };
      });
      await Promise.all(
        newMsgs.map(async (i) => await saveSettings({ variables: i }))
      );
      if (!error) {
        toast(<Success message='Configuração salva com sucesso!' />, { type: toast.TYPE.SUCCESS });
      }
    } catch (e) {
      toast('Houve um problema ao tentar salvar as configurações', { type: toast.TYPE.ERROR });
      console.log("err", e);
    }
  };

  return (
    <ConnectedForm initialValues={initialValues} onSubmit={onSubmit}>
      {({ submitting }) => (
        <Stack direction="column" spacing={4}>
          <Flex direction="row" justify="space-between">
            <Stack direction="column" spacing={2}>
              <Header.H3 style={{ margin: 0 }}>Comunicação</Header.H3>
              <Text>
                Abaixo você define a mensagem que será enviada à pessoa quando um
                match for realizado.
              </Text>
            </Stack>
            <Button type="submit" disabled={submitting}>
              Salvar alterações
            </Button>
          </Flex>
          <Grid templateColumns="auto 30%" gap={4}>
            <GridItem>
              {groups.map((group, i) => {
                return (
                  <Card
                    rounded={"5px"}
                    padding={{ x: 30, y: 30 }}
                    margin={{ bottom: 30 }}
                    key={`whatsapp-card-${i}`}
                  >
                    <Header.H4 style={{ margin: 0, marginBottom: '15px' }}> 
                      {group.name}
                    </Header.H4>
                    {error && <Hint color="error">{error.message}</Hint>}
                    <div
                      css={css`
                        & textarea {
                          height: 100px;
                          margin-bottom: 30px;
                        }
                      `}
                    >
                      <TextareaField
                        name={`input.whatsapp.${group.name
                          .toLowerCase()
                          .split(" ")
                          .join("_")}`}
                        label="Mensagem de whatsapp"
                        validate={required("Valor não pode ser vazio")}
                      />
                    </div>
                  </Card>
                );
              })}
            </GridItem>
            <GridItem>
              <Tip groups={groups} />
            </GridItem>
          </Grid>
        </Stack>
      )}
    </ConnectedForm>
  );
};

export default MatchSettings;
