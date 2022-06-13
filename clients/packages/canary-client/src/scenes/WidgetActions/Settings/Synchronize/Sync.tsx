import { Box, Button, Flex, Heading, Stack, Text, useToast } from "bonde-components/chakra";
import React, { useContext } from "react";
import { MailchimpStart } from '../../../Community/Integrations/types';
import { useQuery, useMutation, gql, Context as SessionContext } from 'bonde-core-tools';
import type { Widget } from "../../FetchWidgets";
import SettingsForm from '../SettingsForm';
import MailchimpIcon from './MailchimpIcon'

interface SyncProps {
  widget: Widget
  updateCache: (updated: Widget) => void
}

const fetchGraphqlMutation = gql`
mutation($id:Int!, $is_community:Boolean!) {
  resync_mailchimp_start(
    is_community: $is_community
    id: $id
  ) {
    status
  }
}
`
const fetchGraphqlQuery = gql`
query($id:Int!, $is_community:Boolean!) {
  resync_mailchimp_status(
    is_community: $is_community
    id: $id
  ) {
    completed
    failed
    last_sync
    waiting
    active
    status
  }
}
`

const lastSync = (last_sync: any) => {
  if (typeof last_sync === 'undefined' || last_sync === "") {
    return "";
  }
  return `Data da última atualização: ${last_sync}`;
}

const total = (data: any) => {
  return (data.resync_mailchimp_status.waiting +
    data?.resync_mailchimp_status.completed +
    data?.resync_mailchimp_status.failed +
    data?.resync_mailchimp_status.active);
}

//TODO: VER FORCESYNC.TSX
export const Sync: React.FC<SyncProps> = ({ widget, updateCache }) => {
  const toast = useToast()

  const { community } = useContext(SessionContext);
  console.log("COMMUNITY", community)


  const [setPropagating] = useMutation(
    fetchGraphqlMutation,
    { variables: { is_community: false, id: widget?.id }, skip: true }
  );

  const { data, loading, error } = useQuery(
    fetchGraphqlQuery,
    {
      variables: { is_community: false, id: widget?.id },
      pollInterval: 5000,
    },
  )

  const sync = async () => {
    // console.log("DATA", data)
    const a: MailchimpStart = await setPropagating();
    if (typeof a !== 'undefined' &&
      typeof a.data?.resync_mailchimp_start.status !== 'undefined' &&
      a.data?.resync_mailchimp_start.status === 'started to add contacts to the queue') {
      toast({ title: `Ae! Sincronização em andamento.`, status: 'success', isClosable: true });
    } else {
      toast({ title: 'Ish! Ocorreu um erro, tente sincronizar novamente.', description: `Se o problema persistir, contacte o suporte. ${a.data?.resync_mailchimp_start.status}` });
    }
  };

  //TODO: MENSAGEM "PRECISA CONFIGURAR MAILCHIMP NA COMUNIDADE"
  if (!community.mailchimp_api_key || !community.mailchimp_list_id) {
    return (
      <Stack direction="row" spacing={7} bg="white" p={6} maxW={742}>
        <MailchimpIcon />
        <Flex maxW={531}>
          <Stack spacing={6}>
            <Stack spacing={2}>
              <Heading as="h3" size="xl">Mailchimp</Heading>
              <Text>Sincronize os contatos com o Mailchimp para se comunicar com as pessoas que agiram na sua campanha.</Text>
            </Stack>
            <Stack>
              <Heading as="h4" size="lg">Forçar sincronização</Heading>
              <Text>A base de contatos dessa ferramenta não está atualizada no Mailchimp? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
            </Stack>
            <Flex justifyContent="flex-end">
              <Button onClick={sync} disabled type='submit' marginTop={4}>Sincronizar</Button>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    )
  }

  if (loading) {
    return <Text>Carregando Mailchimp Status</Text>;
  } else if (error) {
    console.log("ForceSync err: ", error);
    return (
      <Stack>
        <Text>Ish! Ocorreu um erro e no momento não conseguimos retornar o status da sincronização.</Text>
        <Text>Se o problema persistir, contacte o suporte.</Text>
      </Stack>
    );
  }


  if (data?.resync_mailchimp_status.waiting > 0) {
    return (
      <Stack>
        <Heading as="h4" size="sm">Forçar sincronização</Heading>
        <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
        <Heading as="h4" size="sm">Status</Heading>
        <Text size="sm">{data?.resync_mailchimp_status.status} ({data.resync_mailchimp_status.completed} de {total(data)})</Text>
        <Flex justifyContent="flex-end">
          <Button onClick={sync} disabled type='button' marginTop={4}>Sincronizar</Button>
        </Flex>
      </Stack>
    );
  }

  return (
    <SettingsForm
      widget={widget}
      afterSubmit={async (values: any, result: any) => {
        updateCache(result.data.update_widgets.returning[0])
      }}
      initialValues={{
        settings: {
          ...widget.settings
        }
      }}
    >
      {() => (
        <Stack direction="row" spacing={7} bg="white" p={6} maxW={742}>
          <MailchimpIcon />
          <Flex maxW={531}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h3" size="xl">Mailchimp</Heading>
                <Text>Sincronize os contatos com o Mailchimp para se comunicar com as pessoas que agiram na sua campanha.</Text>
              </Stack>
              <Stack>
                <Heading as="h4" size="lg" >Forçar sincronização</Heading>
                <Text>A base de contatos dessa ferramenta não está atualizada no Mailchimp? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
              </Stack>
              <Flex justifyContent="flex-end">
                <Button onClick={sync} type='submit' marginTop={4}>Sincronizar</Button>
              </Flex>
              <Heading as="h4" size="lg">Status</Heading>
              <Text>{data?.resync_mailchimp_status.status}</Text>
              <Text size="sm">{lastSync(data?.resync_mailchimp_status.last_sync)}</Text>
            </Stack>
          </Flex>
        </Stack>
      )}
    </SettingsForm>
  );
}
