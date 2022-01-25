import React from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Empty, Header, Navigation, Tab } from 'bonde-components';
import { useSession } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
import Content from '../../components/Content';
// Subroutes
import Analytics from './Analytics';
import Domains from './Domains';
import Integrations from './Integrations';
import Mobilizers from './Mobilizers';
import Recipient from './Recipient';
import Settings from './Settings';
import Styles from './Styles';

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }

  ${Tab} {
    outline: none;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  match: any
  location: any
}

const CommunityPage = ({ match, location }: Props) => {
  const history = useHistory();
  const { community } = useSession();
  const { t } = useTranslation('community');

  // Utils
  // Test is active pathname
  const is = (regexPath: any): boolean => new RegExp(regexPath).test(location.pathname);
  // Redirect to pathname
  const push = (path: string) => () => history.push(`${match.path}${path}`);

  return community ? (
    <PageWrap>
      <SubHeader>
        <Header.H3>{t('titles.settings')}</Header.H3>
        <Navigation>
          <Tab active={is(/\/community\/analytics\/*/)} onClick={push('/analytics')}>{t('navigation.analytics')}</Tab>
          <Tab active={is(/\/community\/settings\/*/)} onClick={push('/settings')}>{t('navigation.settings')}</Tab>
          <Tab active={is(/\/community\/mobilizers\/*/)} onClick={push('/mobilizers')}>{t('navigation.mobilizers')}</Tab>
          <Tab active={is(/\/community\/recipient\/*/)} onClick={push('/recipient')}>{t('navigation.recipient')}</Tab>
          <Tab active={is(/\/community\/integrations\/*/)} onClick={push('/integrations/mailchimp')}>{t('navigation.integrations')}</Tab>
          <Tab active={is(/\/community\/domains\/*/)} onClick={push('/domains')}>Dominios</Tab>
        </Navigation>
      </SubHeader>
      <Styles>
        <Content>
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
        </Content>
      </Styles>
    </PageWrap>
  ) : <Empty message='Nada por aqui...' />;
};

// TODO:
// - Translate

export default CommunityPage;
