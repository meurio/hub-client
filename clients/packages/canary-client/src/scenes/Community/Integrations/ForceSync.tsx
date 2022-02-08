import React, { useContext } from 'react';
import { useMutation, gql, Context as SessionContext } from 'bonde-core-tools';
import { MailchimpStart } from './types';
import {
  Heading,
  Flex,
  Button,
  Text,
  Stack,
  Success,
  toast,  
} from 'bonde-components';

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
const ForceSync: React.FC = () => {
  const { community } = useContext(SessionContext);
  const [setPropagating] = useMutation(
    fetchGraphqlMutation,
    { variables: { is_community: true, id: community?.id }, skip: true }
  );

  const done = async () => {
    const a: MailchimpStart = await setPropagating();
    if (typeof a !== 'undefined' && 
        typeof a.data.resync_mailchimp_start.status !== 'undefined' &&
        a.data.resync_mailchimp_start.status === 'started to add contacts to the queue') {
      toast(<Success message={`Ae! Sincronização em andamento.`} />, { type: toast.TYPE.SUCCESS });
    } else {
      toast(`Falha na atualização da base de contatos do mailchimp! ${a.data.resync_mailchimp_start.status}`, { type: toast.TYPE.ERROR });
    }
  }; 

  
  return (
    <Stack>
      <Heading as="h4" size="sm">Forçar sincronização</Heading>
      <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
      <Flex justifyContent="flex-end">
        <Button onClick={done} type='button' marginTop={4}>Sincronizar</Button>
      </Flex>
    </Stack>
  );
}

export default ForceSync;