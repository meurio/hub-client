import React, { useContext } from 'react';
import { Context as SessionContext } from 'bonde-core-tools';
import {
  Header,
  Text,
  Message,
  Stack,
  Grid,
  GridItem
} from 'bonde-components';
import styled from 'styled-components';
import TotalActivists from './TotalActivists';
import LastActivists from './LastActivists';
import LastPressures from './LastPressures';
import LastFormEntries from './LastFormEntries';
import SubscriptionDonationsLastMonth from './SubscriptionDonationsLastMonth';
import UniqueDonationsLastMonth from './UniqueDonationsLastMonth';
import TotalDonations from './TotalDonations';
import AnalyticsCard, { Download, Number } from './AnalyticsCard';

type PositionProps = {
  direction?: 'right' | 'left'
}

const Position = styled.div<PositionProps>`
  ${Message} {
    ${props => props.direction === 'right' ? 'right: -20px' : 'left: -20px'};
  }Heading
`
Position.defaultProps = {
  direction: 'left'
}

const Analytics: React.FC = () => {
  const { community } = useContext(SessionContext);
  
  return (
    <Stack direction="column" spacing={8}>
      <Stack spacing={4}>
        <Header.H5 style={{ fontWeight: 800 }} uppercase>Baixar relatórios</Header.H5>
        {/* Download CSV */}
        <Stack direction="row" spacing={4}>
          <Download
            label='Relatórios de doações'
            icon='Ticket'
            path='donation_reports'
          />
          <Download
            label='Doadores recorrentes'
            icon='TicketRecurring'
            path='download_subscriptions'
            />
          <Download
            label='Relatórios de ações'
            icon='BoltUnfilled'
            path='activist_actions'
            />
          <Download
            label='Relatórios de ativistas'
            icon='Network'
            path='activists'
          />
        </Stack>
      </Stack>
      <Grid
        templateColumns={[null, null, "repeat(2, 1fr)", "repeat(5, 1fr)"]}
        templateRows={[null, null, "repeat(5, auto)", "repeat(3, auto)"]}
        gap={4}
      >
        {/* Analytics */}
        <GridItem colStart={1} rowStart={[null, null, 2, 1]}>
          <AnalyticsCard
            label='Ativistas'
            tooltip='Total de pessoas que já agiram em alguma página publicada pela sua comunidade.'
          >
            <TotalActivists communityId={community.id}>
              {({ total }: any) => <Number total={total} />}
            </TotalActivists>
          </AnalyticsCard>
        </GridItem>
        <GridItem colStart={2} rowStart={[null, null, 2, 1]}>
          <AnalyticsCard
            label='Ativistas recentes'
            tooltip='Total de pessoas que agiram na sua comunidade nos últimos 90 dias.'
          >
            <LastActivists communityId={community.id}>
              {({ total }: any) => <Number total={total} />}
            </LastActivists>
          </AnalyticsCard>
        </GridItem>
        <GridItem colStart={1} rowStart={[null, null, 3, 2]}>
          <AnalyticsCard
            label='Pressões recentes'
            tooltip='Total de ações de pressão feitas em páginas da sua comunidade nos últimos 90 dias.'
          >
            <LastPressures communityId={community.id}>
              {({ total }: any) => <Number total={total} />}
            </LastPressures>
          </AnalyticsCard>
        </GridItem>
        <GridItem colStart={2} rowStart={[null, null, 3, 2]}>
          <AnalyticsCard
            label='Inscrições recentes'
            tooltip='Total de ações de formulários publicados pela sua comunidade nos últimos 90 dias.'
          >
            <LastFormEntries communityId={community.id}>
              {({ total }: any) => <Number total={total} />}
            </LastFormEntries>
          </AnalyticsCard>
        </GridItem>

        <GridItem colStart={[null, null, 1, 3]} rowSpan={2} rowStart={[null, null, 4, 1]}>
          <AnalyticsCard
            label='Doações únicas (R$)'
            tooltip='Valor total das doações únicas confirmadas na comunidade nos últimos 30 dias.'
          >
            <SubscriptionDonationsLastMonth communityId={community.id}>
              {({ total }: any) => (
                <Number total={total} format='money'>
                  <Text>Nos últimos 30 dias</Text>
                </Number>
              )}
            </SubscriptionDonationsLastMonth>
          </AnalyticsCard>
        </GridItem>
        <GridItem colStart={[null, null, 2, 4]} rowSpan={2} rowStart={[null, null, 4, 1]}>
          <AnalyticsCard
            label='Doações recorrentes (R$)'
            tooltip='Valor total das doações recorrentes confirmadas na comunidade nos últimos 30 dias.'
          >
            <UniqueDonationsLastMonth communityId={community.id}>
              {({ total }: any) => (
                <Number total={total} format='money'>
                  <Text>Nos últimos 30 dias</Text>
                </Number>
              )}
            </UniqueDonationsLastMonth>
          </AnalyticsCard>
        </GridItem>
        <GridItem colStart={[null, null, 1, 5]} rowSpan={2} rowStart={[null, null, 5, 1]}>
          <AnalyticsCard
            label='Total arrecadado (R$)'
            tooltip='Valor total de doações únicas e recorrentes arrecadadas pela comunidade até agora.'
          >
            <TotalDonations communityId={community.id}>
              {({ total, waiting }: any) => (
                <Number total={total} waiting={waiting} format='money'>
                  <Text>(Confirmadas / Aguardando pagamento)</Text>
                </Number>
              )}
            </TotalDonations>
          </AnalyticsCard>
        </GridItem>
      </Grid>
    </Stack>
  );
}

export default Analytics;