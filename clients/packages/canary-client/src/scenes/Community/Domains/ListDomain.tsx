import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'bonde-components';
import {
  Text,
  Grid,
  GridItem,
  Box,
  Flex,
  Stack,
  Heading
} from 'bonde-components/chakra';
import CreateDomainModal from './CreateDomainModal';
import StatusTags from './StatusTags';
import { MainTitle } from './Styles';
import type { DNSHostedZone } from './types';

type DomainsProps = {
  refetch: any
  dnsHostedZones: DNSHostedZone[]
}


const Domains: React.FC<DomainsProps> = ({ dnsHostedZones, refetch }) => (
  <Stack spacing={4}>
    <Flex direction="row" justify="space-between" pb={4}>
      <Stack spacing={2}>
        <Heading as="h4" size="md">Domínios</Heading>
        <Text>Aqui você gerencia os Domínios (URLs customizadas) das páginas da sua comunidade.</Text>
      </Stack>
      <CreateDomainModal btnText='Adicionar domínio' refetch={refetch} />
    </Flex>
    <Box display={["none", "flex"]}>
      <Grid templateColumns='500px auto 70px' gap={4}>
        <GridItem>
          <MainTitle>Domínio</MainTitle>
        </GridItem>
        <GridItem colSpan={2}>
          <MainTitle>Status</MainTitle>
        </GridItem>
      </Grid>
    </Box>
    <Box>
      {dnsHostedZones.map((dnsHostedZone: DNSHostedZone, index: number) => (
        <Link key={`dns-hosted-zone-${index}`} to={`/community/domains/${dnsHostedZone.id}`}>
          <Box bg="white" p={4} borderBottomWidth={1} borderColor="gray.100">
            <Grid key={`domain-item-${index}`} templateColumns={["auto", "500px auto 70px"]}>
              <GridItem>
                <Text bold>{dnsHostedZone.domain_name}</Text>
              </GridItem>
              <GridItem>
                <StatusTags dnsHostedZone={dnsHostedZone} />
              </GridItem>
              <GridItem>
                <Icon size='small' name='ArrowRight' />
              </GridItem>
            </Grid>
          </Box>
        </Link>
      ))}
    </Box>
  </Stack>
);

export default Domains;
