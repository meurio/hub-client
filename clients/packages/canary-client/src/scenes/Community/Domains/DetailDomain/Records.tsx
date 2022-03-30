import React from 'react';
import { Header, toast, Success, Icon } from 'bonde-components';
import {
  Text,
  Grid,
  GridItem,
  Box,
  Button,
  Stack,
  VStack
} from 'bonde-components/chakra';
import { useMutation, gql } from 'bonde-core-tools';
import { MainTitle } from '../Styles';
import { DNSHostedZone, DNSRecord } from '../types';

const deleteRecordGQL = gql`
  mutation ($records: DeleteRecordsInput) {
    delete_records(records: $records) {
      dns_hosted_zone_id
      records
    }
  }
`

type Props = {
  dnsHostedZone: DNSHostedZone
  refetch: any
}

const Records: React.FC<Props> = ({ dnsHostedZone, refetch }) => {
  const [deleteRecord] = useMutation(deleteRecordGQL);

  return (
    <Stack direction="column" spacing={2}>
      <Grid templateColumns='400px auto 100px auto 200px' gap={4}>
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
      <Box boxShadow="sm">
      {dnsHostedZone
        .dns_records
        .filter((r: DNSRecord) => r.record_type !== 'NS' && r.record_type !== 'SOA')
        .map((dnsRecord: DNSRecord) => (
          <VStack display="block" key={dnsRecord.id} bg="white" p={4} spacing={4}>
            <Grid templateColumns='400px auto 100px auto 200px'>
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
              <GridItem textAlign='right'>
                <Button
                  variant="link"
                  color="black"
                  onClick={async () => {
                    try {
                      const records = {
                        dns_hosted_zone_id: dnsHostedZone.id,
                        records: [dnsRecord.id],
                        community_id: dnsHostedZone.community.id
                      };
                      await deleteRecord({ variables: { records } });
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
            </Grid>
          </VStack>
        ))}
      </Box>
    </Stack>
  );
}

export default Records;