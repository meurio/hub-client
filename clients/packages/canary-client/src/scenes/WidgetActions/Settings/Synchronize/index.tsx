import { Box, Button, Flex, Heading, Stack, Text, useToast } from "bonde-components/chakra";
import React from "react";
import { MailchimpStart } from '../../../Community/Integrations/types';
import { useMutation, gql } from 'bonde-core-tools';
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

//TODO: VER FORCESYNC.TSX
export const ForceSync: React.FC<SyncProps> = ({ widget, updateCache }) => {
  const toast = useToast()

  const [setPropagating] = useMutation(
    fetchGraphqlMutation,
    { variables: { is_community: false, id: widget.id }, skip: true }
  );

  const done = async () => {
    const a: MailchimpStart = await setPropagating();
    if (typeof a !== 'undefined' &&
      typeof a.data.resync_mailchimp_start.status !== 'undefined' &&
      a.data.resync_mailchimp_start.status === 'started to add contacts to the queue') {
      toast({ title: `Ae! Sincronização em andamento.`, status: 'success', isClosable: true });
    } else {
      toast({ title: 'Ish! Ocorreu um erro, tente sincronizar novamente.', description: `Se o problema persistir, contacte o suporte. ${a.data.resync_mailchimp_start.status}` });
    }
  };

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
      {({ submitting, dirty }: any) => (
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
                <Button onClick={done} disabled={submitting || !dirty} type='submit' marginTop={4}>Sincronizar</Button>
              </Flex>
            </Stack>
          </Flex>
        </Stack>
      )}
    </SettingsForm>
  );
}
