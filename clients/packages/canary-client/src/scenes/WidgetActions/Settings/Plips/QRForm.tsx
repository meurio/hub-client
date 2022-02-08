import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  InputField,
  Heading,
  Text,
  Stack
} from "bonde-components";
import { useMutation, useQuery, gql } from "bonde-core-tools";

import type { Widget } from "../../FetchWidgets";
import Wizard from "./components/Wizard";

const GET_PLIP_FORM = gql`
  query ($code: uuid!) {
    plips(where: { unique_identifier: { _eq: $code }, confirmed_signatures: { _is_null: true } }) {
      id
      unique_identifier
      created_at
      form_data
      state
      expected_signatures
    }
  }
`;

const UPDATE_PLIP_FORM = gql`
  mutation ($id: Int!, $confirmed_signatures: Int!) {
    update_plips_by_pk(pk_columns: {id: $id}, _set: { confirmed_signatures: $confirmed_signatures }) {
      id
      unique_identifier
    }
  }
`;

interface FormData {
  name: string;
  state: string;
  signature_quantity: number;
}

interface Properties {
  widget: Widget
}

const QRForm: React.FC<Properties> = ({ widget }) => {
  const [formValues, setFormValues] = useState();
  const { code }: any = useParams();
  const [updatePlipForm] = useMutation(UPDATE_PLIP_FORM);
  const { loading, error, data } = useQuery(GET_PLIP_FORM, { variables: { code } });

  if (loading) return <p>Carregando formulário...</p>;
  if (error) return <p>Failed!</p>

  const handleSubmit = ({ id, confirmed_signatures }: any) => {
    updatePlipForm({ variables: { id, confirmed_signatures } })
      .then((resp: any) => {
        setFormValues(resp.data.update_plips_by_pk)
      })
      .catch((err: any) => {
        console.log("error", err);
      })
  }

  const plipForm = data?.plips[0];
  const formData: FormData = plipForm.form_data;

  return formValues ? (
    <Flex direction="column" flex={1}>
      <Flex flex={1} py={8}>
        <Heading fontSize="2xl">Tudo certo! Dados atualizados, agora temos 12.455 assinaturas pela Amazônia <span role="img" aria-label="Emoji">🎉</span></Heading>
      </Flex>
      <Stack py={4} borderTop="1px solid" borderColor="gray.100" spacing={2}>
        <Button as={Link} to={`/widgets/${widget.id}/settings/workflow`}>Atualizar outra ficha</Button>
        <Button as={Link} to={`/widgets/${widget.id}/settings`} variant="outline" colorScheme="black">Por agora é só</Button>
      </Stack>
    </Flex>
  ) : (
    <Wizard
      onSubmit={handleSubmit}
      initialValues={{
        id: plipForm.id,
        unique_identify: code,
        confirmed_signatures: plipForm.expected_signatures
      }}
    >
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="2xl">Confere aí:</Heading>
          <InputField
            name="unique_identify"
            label="Código da ficha"
          />
          <Text>Ficha de <strong>{plipForm.state}</strong> gerada por <strong>{formData.name}</strong>.</Text>
        </Stack>
      </Wizard.Page>
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="2xl">Quantas assinaturas foram coletadas?</Heading>
          <InputField
            type="number"
            name="confirmed_signatures"
            label="Total de assinaturas"
          />
        </Stack>
      </Wizard.Page>
    </Wizard>
  );
}

export default QRForm;