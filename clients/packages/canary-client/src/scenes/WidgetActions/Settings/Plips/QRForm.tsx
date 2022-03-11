import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  InputField,
  Heading,
  Text,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "bonde-components";
import { useMutation, useQuery, gql, Context as SessionContext } from "bonde-core-tools";

import type { Widget } from "../../FetchWidgets";
import Wizard from "./components/Wizard";
import useQueryParams from "./useQueryParams";

const GET_PLIP_SIGNATURES = gql`
  query ($code: String!, $widget_id: Int!) {
    plips(where: { unique_identifier: { _eq: $code }, widget_id: { _eq: $widget_id } }, order_by: { created_at: desc }, limit: 1) {
      id
      expected_signatures
      state: form_data(path: "state")
      name: form_data(path: "name")
      created_at
    }

    plip_signatures_aggregate(where: {
      unique_identifier: {
        _eq: $code
      },widget_id: { _eq: $widget_id }
    }) {
      aggregate {
        count
        sum {
          confirmed_signatures
        }
      }
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

interface Properties {
  widget: Widget
}

export const QRForm: React.FC<Properties> = ({ widget }) => {
  const { currentUser: user } = useContext(SessionContext);
  const [formValues, setFormValues] = useState();
  const { code }: any = useParams();
  const urlParams = useQueryParams();
  const [insertPlipSignature] = useMutation(INSERT_PLIP_SIGNATURE_FORM);
  const { loading, error, data } = useQuery(GET_PLIP_SIGNATURES, { variables: { code, widget_id: widget.id } });

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

    insertPlipSignature({ variables: { input } })
      .then((resp: any) => {
        setFormValues(resp.data.insert_plip_signatures_one)
      })
      .catch((err: any) => {
        console.log("error", err);
      })
  }

  const plipSignaturesAgg: {
    aggregate: {
      count: number
      sum: {
        confirmed_signatures: number
      }
    }
  } = data?.plip_signatures_aggregate;
  const plipForm = (data?.plips || [])[0]

  return formValues ? (
    <Flex direction="column" flex={1}>
      <Flex flex={1} py={8}>
        <Heading fontSize="2xl">Tudo certo! Dados atualizados, agora temos {Number(urlParams.get('count') || 0) + (formValues as any).confirmed_signatures} assinaturas pela Amazônia <span role="img" aria-label="Emoji">🎉</span></Heading>
      </Flex>
      <Stack py={4} borderTop="1px solid" borderColor="gray.100" spacing={2}>
        <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings/workflow?count=${Number(urlParams.get('count') || 0) + (formValues as any).confirmed_signatures}`}>Atualizar outra ficha</Button>
        <Button minH="42px" as={Link} to={`/widgets/${widget.id}/settings`} variant="outline" colorScheme="black">Por agora é só</Button>
      </Stack>
    </Flex>
  ) : !plipForm ? (
    <>
      <Flex mt={7} mb="20%">
        <Heading
          as="h5"
          size="5xl">
          Ops! QR Code inválido, tente escanear novamente.
        </Heading>
      </Flex>
      <Button minH="42px" onClick={() => window.location.href = `/widgets/${widget.id}/settings/workflow?count=${data?.confirmed_signatures || 0}`}>tentar novamente</Button>
    </>
  ) : (
    <Wizard
      buttonText={plipSignaturesAgg.aggregate.count > 0 ? 'Confirmar nova ficha' : 'Confirma'}
      onSubmit={handleSubmit}
      initialValues={{
        unique_identifier: code,
        confirmed_signatures: plipForm?.expected_signatures
      }}
    >
      <Wizard.Page>
        <Stack spacing={4} flex={1} py={8}>
          <Heading fontSize="3xl">Confere aí:</Heading>
          <InputField
            name="unique_identifier"
            label="Código da ficha"
          />
          <Text>
            Ficha de <strong>{plipForm?.state}</strong> gerada por <strong>{plipForm?.name}</strong>
            {plipSignaturesAgg.aggregate.count > 0
              ? `, que já enviou ${plipSignaturesAgg.aggregate.sum.confirmed_signatures} assinaturas anteriormente.`
              : `.`
            }
          </Text>
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
