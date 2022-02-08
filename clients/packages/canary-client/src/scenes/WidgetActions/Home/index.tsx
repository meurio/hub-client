import React from 'react';
import { Box, Header, Tab, Stack, Grid, GridItem } from "bonde-components"
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import SearchList from '../SearchList';
import WidgetButton from '../WidgetButton';
import { Widget, WidgetLoading } from '../FetchWidgets';
import Container, { NavigationArgs } from '../Container';
import Shortcuts from './Shortcuts';

type Props = {
  community: {
    id: number
  }
  widgets: Widget[]
  loading: boolean
}

const Home = ({ community, widgets, loading }: Props): React.ReactElement => {
  const { t } = useTranslation("widgetActions");

  return (
    <Container
      title={t("titles.home")}
      navigation={({ push, is }: NavigationArgs) => (
        <>
          <Tab active={is(/\/widgets\/*/)} onClick={() => push('/')}>
            {t("navigation.home")}
          </Tab>
        </>
      )}
    >
      <Stack direction="column" spacing={4}>
        {!isMobile ? 
          <section style={{ marginBottom: '15px' }}>
            <Header.H5 uppercase>{t('home.shortcuts.title')}</Header.H5>
            <Shortcuts community={community} />
          </section> : null}
        <SearchList
          header={<Header.H5 uppercase>{t('home.actions')}</Header.H5>}
          data={widgets}
          empty={<Header.H4 style={{ textAlign: 'center' }}>{t('home.searchEmpty')}</Header.H4>}
          loading={loading}
          renderLoading={<WidgetLoading />}
        >
          {({ result }: any) => (
            <Box
              maxHeight={["500px", "none"]}
              overflowY="auto"
            >
              <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", null, "repeat(4, 1fr)", null, "repeat(6, 1fr)"]} gap={4} rowGap={4}>
              {result.map((w: Widget, index: number) => (
                <GridItem key={`widget-button-${index}`}>
                  <WidgetButton key={w.id} widget={w} />
                </GridItem>
              ))}
              </Grid>
            </Box>
          )}
        </SearchList>
      </Stack>
    </Container>
  );
};

export default Home;
