import React, { useContext } from 'react';
import {
  Text,
  Icon,
  toast,
  Success,
  Grid,
  GridItem,
  Stack,
  Box,
  Button
} from 'bonde-components';
import { useMutation, gql, Context as SessionContext } from 'bonde-core-tools';
import { useHistory } from 'react-router-dom';
import { Status, MainTitle } from '../Styles';
import { DNSHostedZone } from '../types';

// Types
type Record = {
  data: string
  name: string
}

type CheckDNS = {
  Answer?: Record[]
}

type Props = {
  refetch: any
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
  action: any
  push?: any
}

// Actions
const handleCheckDNS = ({ dnsHostedZone, refetch, action }: Props) => async () => {
  try {
    const result = await fetch(`https://dns.google.com/resolve?name=${dnsHostedZone.domain_name}&type=NS`);
    const dns: CheckDNS = await result.json();
    const nsOK: boolean = dns.Answer ? dns.Answer.reduce(
      (acc: boolean, el: Record) => acc
        ? !!(dnsHostedZone.name_servers.find((ns: string) => el.data.replace(/[.]$/, '') === ns))
        : false,
      true
    ) : false;

    if (nsOK) {
      if (dnsHostedZone.status === 'propagating' || dnsHostedZone.status === 'created' || !dnsHostedZone.ns_ok) {
        // Change domain to propagated only required change status
        await action({ variables: { dns_hosted_zone_id: dnsHostedZone.id, status: 'propagated' } });
        refetch();
      }
      toast(<Success message='DNS propagado com sucesso.' />, { type: toast.TYPE.SUCCESS });
    } else {
      if ((dnsHostedZone.status !== 'propagating' && dnsHostedZone.status !== 'created') || dnsHostedZone.ns_ok) {
        // Change domain to created only required change status
        await action({ variables: { dns_hosted_zone_id: dnsHostedZone.id, status: 'created' } });
        toast('Verifique se o seu dominio foi configurado corretamente.', { type: toast.TYPE.INFO });
        refetch();
      } else {
        toast('DNS ainda não foi propagado, tente novamente mais tarde.', { type: toast.TYPE.INFO });
      }
    }
  } catch (err) {
    console.log('err', err);
    toast('Houve um problema ao tentar checar DNS', { type: toast.TYPE.ERROR });
  }
}

const handleDelete = ({ dnsHostedZone, action, refetch, push }: Props) => async () => {
  try {
    const input = {
      dns_hosted_zone_id: dnsHostedZone.id,
      community_id: dnsHostedZone.community.id
    };
    await action({ variables: { input } });

    toast(<Success message='Dominio removido com sucesso.' />, { type: toast.TYPE.SUCCESS });
    refetch();

    // Redirect
    push && push('/community/domains');
  } catch (err) {
    console.log('err', err);
    toast('Houve um problema ao tentar remover domínio', { type: toast.TYPE.ERROR });
  }
}

// Component
const deleteDomainGQL = gql`
  mutation ($input: DeleteDomainInput) {
    delete_domain(input: $input)
  }
`;

const updateDomainGQL = gql`
  mutation ($dns_hosted_zone_id: Int!, $status: dnshostedzonestatus!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: { status: $status }
    ) {
      id
      domain_name
      community_id
      status
    }
  }
`

const Domain: React.FC<Omit<Props, 'action'>> = (props) => {
  const { currentUser: user } = useContext(SessionContext);
  const [deleteDomain] = useMutation(deleteDomainGQL);
  const [updateDomain] = useMutation(updateDomainGQL);
  const { push } = useHistory();

  return (
    <Stack direction="column" spacing={2}>
      <Grid templateColumns='500px auto 280px'>
        <GridItem>
          <MainTitle>Domínio</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>Status</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>Ações</MainTitle>
        </GridItem>
      </Grid>
      <Box bg="white" boxShadow="sm">
        <Grid templateColumns='500px auto 280px' p={4}>
          <GridItem>
            <Text bold>{props.dnsHostedZone?.domain_name}</Text>
          </GridItem>
          <GridItem>
            <Status
              value={props.dnsIsActivated ? 'active' : 'inactive'}
              labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
            />
          </GridItem>
          <GridItem>
            <Stack direction="row" spacing={6}>
              <Button
                variant="tableLink"
                colorScheme="gray"
                onClick={handleCheckDNS({ ...props, action: updateDomain })}
                style={{ fontSize: '13px' }}
              >
                <Icon size='small' name='Sync' />
                Verificar DNS
              </Button>
              <Button
                disabled={!user.hasAdminPermission()}
                variant="tableLink"
                colorScheme="gray"
                onClick={handleDelete({ ...props, action: deleteDomain, push })}
                style={{ fontSize: '13px' }}
              >
                <Icon size='small' name='Trash' />
                Excluir
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Domain;
