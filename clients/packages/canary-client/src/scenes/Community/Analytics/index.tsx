import React from 'react';
import { useSession } from 'bonde-core-tools';
import {
  Header,
  Icon,
  Text,
  Tooltip,
  InfoIcon,
  Stack,
  Message,
  Hint,
  Heading,
  Flex
} from 'bonde-components';
import { Container } from 'react-grid-system';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import TotalActivists from './TotalActivists';
import LastActivists from './LastActivists';
import LastPressures from './LastPressures';
import LastFormEntries from './LastFormEntries';
import SubscriptionDonationsLastMonth from './SubscriptionDonationsLastMonth';
import UniqueDonationsLastMonth from './UniqueDonationsLastMonth';
import TotalDonations from './TotalDonations';
import Panel from '../../../components/Panel';
import DownloadCSV from './DownloadCSV';

type StylesProps = {
  full?: boolean
}

const Styles = styled.div<StylesProps>`
  ${Panel} {
    min-height: ${props => props.full ? '254px' : '97px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 30px;
  }

  ${Hint} {
    word-break: break-word;
  }
`

type PositionProps = {
  direction?: 'right' | 'left'
}

const Position = styled.div<PositionProps>`
  ${Message} {
    ${props => props.direction === 'right' ? 'right: -20px' : 'left: -20px'};
  }
`;

Position.defaultProps = {
  direction: 'left'
}

const AnalyticsCard = ({ label, tooltip, children, full }: any) => {
  return (
    <Styles full={full}>
      <Stack direction="row" marginBottom="12px" spacing={2} mt={4} alignItems="center">
        <Heading
          as="h3"
          size="xs"
          color="gray.400"
          fontWeight="600"
          textTransform="uppercase"
        >
          {label}
        </Heading>

        {tooltip && (
          <Tooltip label={label}>
            <InfoIcon color="gray.200" boxSize={3} />
          </Tooltip>
        )}
      </Stack>
      <Panel>
        {children}
      </Panel>
    </Styles>
  );
}

type NumberProps = {
  query: any
  children?: any
  format: 'default' | 'money'
}

const Number = ({ query: Query, children, format }: NumberProps) => {
  const { community } = useSession();
  const numberProps: any = {
    displayType: 'text',
    thousandSeparator: '.',
    decimalSeparator: ','
  }
  if (format === 'money') {
    numberProps.decimalScale = 2
    numberProps.fixedDecimalScale = true
  }

  return (
    <Query communityId={community?.id || 0}>
      {({ total, waiting }: any) => (
        <>
          <Header.H2>
            <NumberFormat {...numberProps} value={total} />
          </Header.H2>
          {waiting && (
            <Text style={{ color: '#a4a4a4' }}>
              <Icon color='#c7c7c7' name='Sync' size='small' />
              <NumberFormat {...numberProps} value={waiting} />
            </Text>
          )}
          {children}
        </>
      )}
    </Query>
  );
}

Number.defaultProps = {
  format: 'default'
}
const Analytics = (): JSX.Element => (
  <Container fluid style={{ width: "100%", padding: "0" }}>
    <Heading
      as="h3"
      size="xs"
      color="gray.400"
      fontWeight="600"
      textTransform="uppercase"
      marginTop={2}
      marginBottom={3}
    >
      Baixar relatórios
    </Heading>

    <DownloadCSV
      label='Relatórios de doações'
      icon='Ticket'
      path='donation_reports'
    />

    <DownloadCSV
      label='Doadores recorrentes'
      icon='TicketRecurring'
      path='download_subscriptions'
    />

    <DownloadCSV
      label='Relatórios de ações'
      icon='BoltUnfilled'
      path='activist_actions'
    />

    <DownloadCSV
      label='Relatórios de ativistas'
      icon='Network'
      path='activists'
    />

    <Stack mt={4} direction={["column", "column", "column", "row"]} spacing={4}>
      <Flex direction="column" justifyContent="space-between">
        <AnalyticsCard
          label='Ativistas'
          tooltip='Total de pessoas que já agiram em alguma página publicada pela sua comunidade.'
        >
          <Number query={TotalActivists} />
        </AnalyticsCard>

        <AnalyticsCard
          label='Ativistas recentes'
          tooltip='Total de pessoas que agiram na sua comunidade nos últimos 90 dias.'
        >
          <Number query={LastActivists} />
        </AnalyticsCard>
      </Flex>
      <Flex direction="column" justifyContent="space-between">
        <AnalyticsCard
          label='Pressões recentes'
          tooltip='Total de ações de pressão feitas em páginas da sua comunidade nos últimos 90 dias.'
        >
          <Number query={LastPressures} />
        </AnalyticsCard>

        <AnalyticsCard
          label='Inscrições recentes'
          tooltip='Total de ações de formulários publicados pela sua comunidade nos últimos 90 dias.'
        >
          <Number query={LastFormEntries} />
        </AnalyticsCard>
      </Flex>

      <AnalyticsCard
        full
        label='Doações únicas (R$)'
        tooltip='Valor total das doações únicas confirmadas na comunidade nos últimos 30 dias.'
      >
        <Number query={SubscriptionDonationsLastMonth} format='money'>
          <Text>Nos últimos 30 dias</Text>
        </Number>
      </AnalyticsCard>

      <AnalyticsCard
        full
        label='Doações recorrentes (R$)'
        tooltip='Valor total das doações recorrentes confirmadas na comunidade nos últimos 30 dias.'
      >
        <Number query={UniqueDonationsLastMonth} format='money'>
          <Text>Nos últimos 30 dias</Text>
        </Number>
      </AnalyticsCard>

      <AnalyticsCard
        full
        label='Total arrecadado (R$)'
        tooltip='Valor total de doações únicas e recorrentes arrecadadas pela comunidade até agora.'
      >
        <Number query={TotalDonations} format='money'>
          <Text>(Confirmadas / Aguardando pagamento)</Text>
        </Number>
      </AnalyticsCard>
    </Stack>
  </Container>
);

export default Analytics;
