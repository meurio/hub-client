import React from 'react';
import { Header, Icon, Grid, GridItem, Box, Stack, Text } from 'bonde-components';
import {
  ConnectDomainIcon,
  InsertDomainIcon,
  PropagateDomainIcon
} from '../Icons';
import { Status, SmallText } from '../Styles';
import { DNSHostedZone } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
}

const Explain = ({ dnsHostedZone, dnsIsActivated }: Props) => {
  return (
    <Stack direction="column" spacing={2}>
      <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        {!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}
      </Text>
      <Box bg="white" boxShadow="sm" px={4} py={6}>
        <Grid
          templateColumns='auto 50px auto 50px auto'
          gap={4}
          alignItems="center"
          justifyItems="center"
        >
          <GridItem>
            <Stack direction="column" align="center" spacing={2}>
              <InsertDomainIcon />
              <Header.H5>Inserir domínio</Header.H5>
              <SmallText>O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE.</SmallText>
              <Status
                activeStatus='done'
                value='done'
                labels={{ 'done': 'Concluído' }}
              />
            </Stack>
          </GridItem>
          <GridItem>
            <Icon name='ArrowRight' size='small' />
          </GridItem>
          <GridItem>
            <Stack direction="column" align="center" spacing={2}>
              <ConnectDomainIcon />
              <Header.H5>Conectar ao BONDE</Header.H5>
              <SmallText>Para conseguir usar seu endereço no BONDE, copie os registros abaixo e cole no site onde comprou seu domínio. <a href="https://www.faq.bonde.org/#block-7283" title='FAQ Dominios' target="_blank" rel="noopener noreferrer">Clique aqui</a> para ver o passo a passo.</SmallText>
              <Status
                isActived={() => !!(dnsHostedZone.status !== 'created' || dnsHostedZone.ns_ok)}
                labels={{ 'active': 'Concluído', 'inactive': 'Inativo' }}
              />
            </Stack>
          </GridItem>
          <GridItem>
            <Icon name='ArrowRight' size='small' />
          </GridItem>
          <GridItem>
            <Stack direction="column" align="center" spacing={2}>
              <PropagateDomainIcon />
              <Header.H5>Propagar Domínio</Header.H5>
              <SmallText>O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até 48h.</SmallText>
              <Status
                isActived={() => dnsIsActivated}
                labels={{ active: 'Concluído', inactive: 'Inativo' }}
              />
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
}

export default Explain;