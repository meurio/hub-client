import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  InputField,
  Heading,
  Text,
  Stack
} from "bonde-components";
import { useMutation, useQuery, gql, Context as SessionContext } from "bonde-core-tools";

import type { Widget } from "../../FetchWidgets";
import Wizard from "./components/Wizard";
import useQueryParams from "./useQueryParams";

const GET_PLIP_FORM = gql`
  query ($code: String!) {
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

const INSERT_PLIP_SIGNATURE_FORM = gql`
  mutation ($input: plip_signatures_insert_input!) {
    insert_plip_signatures_one(object: $input) {
      id
      created_at
      confirmed_signatures
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
  const { currentUser: user } = useContext(SessionContext);
  const [formValues, setFormValues] = useState();
  const { code }: any = useParams();
  const urlParams = useQueryParams();
  const [insertPlipSignature] = useMutation(INSERT_PLIP_SIGNATURE_FORM);
  const { loading, error, data } = useQuery(GET_PLIP_FORM, { variables: { code } });

  if (loading) return <p>Carregando formulário...</p>;
  if (error) return <p>Failed!</p>

  const handleSubmit = ({ unique_identifier, confirmed_signatures }: any) => {
    const input: any = {
      unique_identifier,
      confirmed_signatures,
      widget_id: widget.id
    }

    if (user.isAdmin) {
      input.user_id = user.id;
    }

    insertPlipSignature({ variables: { input }})
      .then((resp: any) => {
        setFormValues(resp.data.insert_plip_signatures_one)
      })
      .catch((err: any) => {
        console.log("error", err);
      })
  }

  const plipForm = data?.plips[0];
  if (!plipForm) {
    return (
      <Flex direction="column" flex={1}>
        <Flex flex={1} py={8}>
          <Heading fontSize="2xl">Ops! Essa ficha já foi registrada.</Heading>
        </Flex>
        <Stack py={4} borderTop="1px solid" borderColor="gray.100" spacing={2}>
          <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings/workflow`}>Atualizar outra ficha</Button>
          <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings`} variant="outline" colorScheme="black">Voltar ao início</Button>
        </Stack>
      </Flex>  
    );
  }

  const formData: FormData = plipForm.form_data;

  return formValues ? (
    <Flex direction="column" flex={1}>
      <Flex flex={1} py={8}>
        <Heading fontSize="2xl">Tudo certo! Dados atualizados, agora temos {Number(urlParams.get('count') || 0) + (formValues as any).confirmed_signatures} assinaturas pela Amazônia <span role="img" aria-label="Emoji">🎉</span></Heading>
      </Flex>
      <Stack py={4} borderTop="1px solid" borderColor="gray.100" spacing={2}>
        <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings/workflow`}>Atualizar outra ficha</Button>
        <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings`} variant="outline" colorScheme="black">Por agora é só</Button>
      </Stack>
    </Flex>
  ) : (
    <Wizard
      onSubmit={handleSubmit}
      initialValues={{
        unique_identifier: code,
        confirmed_signatures: plipForm.expected_signatures
      }}
    >
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="2xl">Confere aí:</Heading>
          <InputField
            name="unique_identifier"
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