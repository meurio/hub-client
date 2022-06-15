import React, { useContext } from 'react';
import { useQuery, useMutation, gql, Context as SessionContext } from 'bonde-core-tools';
import { MailchimpStart } from './types';
import { toast, Success, chakra } from 'bonde-components';
const {
  Heading,
  Flex,
  Button,
  Text,
  Stack
} = chakra;

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
const lastSync = (last_sync: any) =>{

  if (typeof last_sync === 'undefined' || last_sync === "" ) {
    return "";
  }
  return `Data da última atualização: ${last_sync}`;
}

const total = (data: any) => {
  return (data.resync_mailchimp_status.waiting +
          data.resync_mailchimp_status.completed +
          data.resync_mailchimp_status.failed +
          data.resync_mailchimp_status.active);
}

const ForceSync: React.FC = () => {
  const { community } = useContext(SessionContext);
  const [setPropagating] = useMutation(
    fetchGraphqlMutation,
    { variables: { is_community: true, id: community?.id }, skip: true }
  );

  const { data, loading, error }  = useQuery(
    fetchGraphqlQuery,
    {
      variables: { is_community: true, id: community?.id },
      pollInterval: 5000,
    },
  )

  const done = async () => {
    const a: MailchimpStart = await setPropagating();
    if (typeof a !== 'undefined' &&
        typeof a.data.resync_mailchimp_start.status !== 'undefined' &&
        a.data.resync_mailchimp_start.status === 'started to add contacts to the queue') {
      toast(<Success message={`Ae! Sincronização em andamento.`} />, { type: toast.TYPE.SUCCESS });
    } else {
      toast(`Ish! Ocorreu um erro, tente sincronizar novamente. Se o problema persistir, contacte o suporte. ${a.data.resync_mailchimp_start.status}`, { type: toast.TYPE.ERROR });
    }
  };

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

  if (data.resync_mailchimp_status.waiting > 0) {
    return (
      <Stack>
        <Heading as="h4" size="sm">Forçar sincronização</Heading>
        <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
        <Heading as="h4" size="sm">Status</Heading>
        <Text size="sm">{data.resync_mailchimp_status.status} ({data.resync_mailchimp_status.completed} de {total(data)})</Text>
        <Flex justifyContent="flex-end">
          <Button onClick={done} disabled type='button' marginTop={4}>Sincronizar</Button>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack>
      <Heading as="h4" size="sm">Forçar sincronização</Heading>
      <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
      <Heading as="h4" size="sm">Status</Heading>
      <Text size="sm">{data.resync_mailchimp_status.status}</Text>
      <Text size="sm">{lastSync(data.resync_mailchimp_status.last_sync)}</Text>
      <Flex justifyContent="flex-end">
        <Button onClick={done} type='button' marginTop={4}>Sincronizar</Button>
      </Flex>
    </Stack>
  );
}

export default ForceSync;