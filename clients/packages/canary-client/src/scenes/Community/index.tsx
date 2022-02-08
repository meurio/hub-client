import React, { useContext } from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Flex, Empty, Heading, DarkMode, Tab, Container, Stack } from 'bonde-components';
import { Context as SessionContext } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
// Subroutes
import Analytics from './Analytics';
import Domains from './Domains';
import Integrations from './Integrations';
import Mobilizers from './Mobilizers';
import Recipient from './Recipient';
import Settings from './Settings';

type Props = {
  match: any
  location: any
}

const CommunityPage: React.FC<Props> = ({ match, location }): React.ReactElement => {
  const history = useHistory();
  const { community } = useContext(SessionContext);
  const { t } = useTranslation('community');

  // Utils
  // Test is active pathname
  const is = (regexPath: any): boolean => new RegExp(regexPath).test(location.pathname);
  // Redirect to pathname
  const push = (path: string) => () => history.push(`${match.path}${path}`);

  return community ? (
    <Flex direction="column" flex={1}>
      <Stack spacing={5} bg="black" px={12} pt={2}>
        <Heading as="h2" size="2xl" color="white" fontWeight="extrabold">{t('titles.settings')}</Heading>
        <DarkMode>
          <Flex direction="row">
            <Tab active={is(/\/community\/analytics\/*/)} onClick={push('/analytics')}>{t('navigation.analytics')}</Tab>
            <Tab active={is(/\/community\/settings\/*/)} onClick={push('/settings')}>{t('navigation.settings')}</Tab>
            <Tab active={is(/\/community\/mobilizers\/*/)} onClick={push('/mobilizers')}>{t('navigation.mobilizers')}</Tab>
            <Tab active={is(/\/community\/recipient\/*/)} onClick={push('/recipient')}>{t('navigation.recipient')}</Tab>
            <Tab active={is(/\/community\/integrations\/*/)} onClick={push('/integrations/mailchimp')}>{t('navigation.integrations')}</Tab>
            <Tab active={is(/\/community\/domains\/*/)} onClick={push('/domains')}>Domínios</Tab>
          </Flex>
        </DarkMode>
      </Stack>
      <Container>
        <Switch>
          <Route exact path={`${match.path}`}>
            {/* Redirect /community to index tab */}
            <Redirect to={`${match.path}/analytics`} />
          </Route>
          <Route exact path={`${match.path}/analytics`}>
            <Analytics />
          </Route>
          <Route exact path={`${match.path}/settings`}>
            <Settings />
          </Route>
          <Route exact path={`${match.path}/mobilizers`}>
            <Mobilizers />
          </Route>
          <Route exact path={`${match.path}/recipient`}>
            <Recipient />
          </Route>
          <Route exact path={`${match.path}/integrations/:name`}>
            <Integrations />
          </Route>
          <Route path={`${match.path}/domains`}>
            <Domains />
          </Route>
        </Switch>
      </Container>
    </Flex>
  ) : <Empty message='Nada por aqui...' />;
};

// TODO:
// - Translate

export default CommunityPage;
