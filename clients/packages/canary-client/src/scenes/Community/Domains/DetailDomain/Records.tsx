import React from 'react';
import {
  Header,
  Icon,
  Text,
  toast,
  Success,
  Grid,
  GridItem,
  Box,
  Button,
  Stack
} from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { MainTitle } from '../Styles';
import { DNSHostedZone, DNSRecord } from '../types';

const deleteRecordGQL = gql`
  mutation ($input: DeleteRecordsInput) {
    delete_records(input: $input)
  }
`

type Props = {
  dnsHostedZone: DNSHostedZone
  refetch: any
}

const Records = ({ dnsHostedZone, refetch }: Props) => {
  const [deleteRecord] = useMutation(deleteRecordGQL);

  return (
    <Stack direction="column" spacing={2}>
      <Grid templateColumns='400px 300px auto auto 200px'>
        <GridItem>
          <MainTitle>Registro</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>Valor</MainTitle>
        </GridItem>
        <GridItem>
          <MainTitle>Tipo</MainTitle>
        </GridItem>
        <GridItem colSpan={2}>
          <MainTitle>TTL</MainTitle>
        </GridItem>
      </Grid>
      <Box bg="white" boxShadow="sm" p={4}>
        <Grid templateColumns='400px 300px auto auto 200px' rowGap={4}>
          {dnsHostedZone
            .dns_records
            .filter((r: DNSRecord) => r.record_type !== 'NS' && r.record_type !== 'SOA')
            .map((dnsRecord: DNSRecord) => (
              <>
                <GridItem>
                  <Header.H5>{dnsRecord.name}</Header.H5>
                </GridItem>
                <GridItem>
                  <Text
                    style={dnsRecord.record_type === 'TXT'
                      ? { wordBreak: 'break-all' }
                      : { whiteSpace: "break-spaces" }
                    }
                  >
                    {dnsRecord.record_type === 'MX' ? dnsRecord.value.split(/\. /).map((v: string) => `${v.replace(/\.$/, '')}.\n`) : dnsRecord.value}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{dnsRecord.record_type}</Text>
                </GridItem>
                <GridItem>
                  <Text>{dnsRecord.ttl}</Text>
                </GridItem>
                <GridItem>
                  <Button
                    variant="link"
                    colorScheme="gray"
                    onClick={async () => {
                      try {
                        const input = {
                          dns_hosted_zone_id: dnsHostedZone.id,
                          records: [dnsRecord.id],
                          community_id: dnsHostedZone.community.id
                        };
                        await deleteRecord({ variables: { input } });
                        toast(<Success message='Registro removido com sucesso' />, { type: toast.TYPE.SUCCESS });
                        refetch();
                      } catch (err) {
                        toast(err, { type: toast.TYPE.ERROR });
                      }
                    }}
                  >
                    <Icon name='Trash' size='small' /> Excluir
                  </Button>
                </GridItem>
              </>
            ))
          }
        </Grid>
      </Box>
    </Stack>
  );
}

export default Records;