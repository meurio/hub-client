import React, { useContext } from 'react';
import { Icon, Success, toast } from 'bonde-components';
import {
  Text,
  Grid,
  GridItem,
  Stack,
  Box,
  Button
} from 'bonde-components/chakra';
import { useMutation, gql, Context as SessionContext } from 'bonde-core-tools';
import { useHistory } from 'react-router-dom';
import { MainTitle } from '../Styles';
import StatusTags from '../StatusTags';
import type { DNSHostedZone } from '../types';

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
      if (dnsHostedZone.status !== 'propagated' || !dnsHostedZone.ns_ok) {
        // Atualiza status do domínio somente quando estiver desatualizado
        await action({
          variables: {
            dns_hosted_zone_id: dnsHostedZone.id,
            updated_fields: { status: 'propagated', ns_ok: true }
          }
        });
        refetch();
      }
      toast(<Success message='DNS propagado com sucesso.' />, { type: toast.TYPE.SUCCESS });
    } else if (dnsHostedZone.status === 'propagated' || dnsHostedZone.ns_ok) {
      // Atualiza status do domínio quando já estava propagado mas no momento desta verificação não está
      await action({
        variables: {
          dns_hosted_zone_id: dnsHostedZone.id,
          updated_fields: { status: 'created', ns_ok: false }
        }
      });
      toast('Verifique se o seu dominio foi configurado corretamente.', { type: toast.TYPE.INFO });
      refetch();
    } else if (dnsHostedZone.status === 'propagating') {
      toast('DNS ainda não foi propagado, tente novamente mais tarde.', { type: toast.TYPE.INFO });
    }
  } catch (err) {
    console.log('err', err);
    toast('Houve um problema ao tentar checar DNS', { type: toast.TYPE.ERROR });
  }
}

const handleDelete = ({ dnsHostedZone, action, refetch, push }: Props) => async () => {
  try {
    const domain = {
      dns_hosted_zone_id: dnsHostedZone.id,
      community_id: dnsHostedZone.community.id
    };
    await action({ variables: { domain } });

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
  mutation ($domain: DeleteDomainInput!) {
    delete_domain(domain: $domain) {
      id
      status
    }
  }
`;

const updateDomainGQL = gql`
  mutation ($dns_hosted_zone_id: Int!, $updated_fields: dns_hosted_zones_set_input!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: $updated_fields
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
          <MainTitle>DOMÍNIO</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>STATUS</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>AÇÕES</MainTitle>
        </GridItem>
      </Grid>
      <Box bg="white" boxShadow="sm">
        <Grid templateColumns='500px auto 280px' p={4}>
          <GridItem>
            <Text bold>{props.dnsHostedZone?.domain_name}</Text>
          </GridItem>
          <GridItem>
            <StatusTags dnsHostedZone={props.dnsHostedZone} />
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
