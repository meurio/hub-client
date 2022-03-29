import React from 'react';
import { Icon } from 'bonde-components';
import { Heading, HStack, VStack, Text, SimpleGrid, Link } from 'bonde-components/chakra';
import {
  ActiveDomainIcon,
  CertifyDomainIcon,
  ConnectDomainIcon,
  InsertDomainIcon,
  PropagateDomainIcon
} from '../Icons';
import { DNSHostedZone } from '../types';
import getStatus from '../getStatus';


interface StatusProperties {
  icon: 'Check' | 'Warning' | 'Sync'
}

const Status: React.FC<StatusProperties> = ({ icon, children }) => {
  return (
    <HStack
      css={`
        ${Icon} {
          path {
            fill: ${icon === 'Check' ? '#50E3C2' : icon === 'Warning' ? '#FF2B4E' : '#ee0099'}
          }
        }
      `}
    >
      <Icon size='small' name={icon} />
      <Text color={icon === "Check" ? 'green.200' : icon === 'Warning' ? 'red.200' : 'pink.200'}>{children}</Text>
    </HStack>
  );
}

interface StepWrapperProperties {
  // TODO: type like element
  icon: any;
  title: string;
  description: string | any;
  disabled?: boolean;
}

const StepWrapper: React.FC<StepWrapperProperties> = ({
  children,
  icon: Icon,
  disabled = false,
  title,
  description
}) => (
  <VStack align="center" spacing={4} px={8} opacity={disabled ? '45%' : 'inherit'}>
    <Icon />
    <Heading fontSize="xl">{title}</Heading>
    <Text
      align="center"
      css={`
        a {
          color: #ee0099;
        }
      `}
    >
      {description}
    </Text>
    {disabled ? <Text>--</Text> : children}
  </VStack>
);

interface StepProperties {
  dnsHostedZone: DNSHostedZone;
}

const Steps: React.FC<StepProperties> = ({ dnsHostedZone }) => {
  const { dns, certificate } = getStatus(dnsHostedZone);

  return (
    <SimpleGrid
      bg="white" px={4} py={6}
      templateColumns="auto 20px auto 20px auto 20px auto 20px auto"
      css={`
        ${Icon} {
          margin: auto 0;
        }
      `}
    >
      <StepWrapper
        icon={InsertDomainIcon}
        title="Inserir domínio"
        description="O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE."
      >
        <Status icon="Check">Concluído</Status>
      </StepWrapper>
      
      <Icon name='ArrowRight' size='small' />
      
      <StepWrapper
        icon={ConnectDomainIcon}
        title="Conectar ao BONDE"
        description={
          <>
            Para conseguir usar seu endereço no BONDE, copie os registros abaixo e cole no site onde comprou seu domínio. <Link colorScheme="pink" href="http://www.faq.bonde.org/#block-7283" title='FAQ Dominios' target="_blank" rel="noopener noreferrer">Clique aqui</Link> para ver o passo a passo.
          </>
        }
      >
        {dns === 'propagated' || dns === 'propagating'
          ? <Status icon="Check">Concluído</Status>
          : <Status icon="Warning">Aguardando ação</Status>}
      </StepWrapper>
      
      <Icon name='ArrowRight' size='small' />
      
      <StepWrapper
        disabled={dns === 'created'}
        icon={PropagateDomainIcon}
        title="Propagar Domínio"
        description={
          <>
            O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até <strong>48h</strong>.
          </>
        }
      >
        {dns === 'propagated' ? <Status icon="Check">Concluído</Status> : <Status icon="Sync">Conferir DNS</Status>}
      </StepWrapper>
      
      <Icon name='ArrowRight' size='small' />
      
      <StepWrapper
        disabled={dns !== 'propagated'}
        icon={CertifyDomainIcon}
        title="Certificar Domínio"
        description={
          <>
            Quando o domínio for propagado, o BONDE gera <strong>automaticamente </strong>um certificado de segurança. Isso leva poucos minutos.
          </>
        }
      >
        {dns === 'propagated' && certificate === 'active' ? <Status icon="Check">Concluído</Status> : <Status icon="Sync">Em andamento</Status>}
      </StepWrapper>
      
      <Icon name='ArrowRight' size='small' />

      <StepWrapper
        disabled={dns !== 'propagated' || (dns === 'propagated' && certificate !== 'active')}
        icon={ActiveDomainIcon}
        title="Domínio Ativo"
        description={
          <>
            Pronto! Seu domínio está  ativo e disponível para utilizar nas páginas da sua comunidade no BONDE. <a href={`https://app.bonde.org`}>Clique aqui</a> para ver suas páginas.
          </>
        }
      >
        {dns === 'propagated' && certificate === 'active' ? <Status icon="Check">Concluído</Status> : <Status icon="Sync">Em andamento</Status>}
      </StepWrapper>
    </SimpleGrid>
  );
}

export default Steps;
