import React, { useContext, useState } from "react";
import { Tab, Header, Heading, DarkMode } from "bonde-components";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Context as SessionContext } from 'bonde-core-tools';
import { isMobile } from "react-device-detect";

import Container, { NavigationArgs } from "../Container";
import { Widget } from "../FetchWidgets";
import Labels from "../Labels";
import Navigation from './Navigation';
import Adjusts from './Adjusts';
import Autofire from "./Autofire";

import ConfigurePostAction from "./ConfigurePostAction";
import Performance from "./Pressure";
import Plips from "./Plips";

type Props = {
  widgets: Widget[];
};

interface RoutesByKindProps {
  widget: Widget
  updateCache: (updated: Widget) => void
}

const RoutesByKind: React.FC<RoutesByKindProps> = ({ widget, updateCache }) => {
  const match = useRouteMatch();

  if (widget.kind === "pressure") {
    return (
      <Route path={`${match.path}`}>
        <Performance widget={widget} updateCache={updateCache} />
      </Route>
    );
  } else if (widget.kind === 'plip') {
    return (
      <Route path={`${match.path}`}>
        <Plips widget={widget} />
      </Route>
    )
  }
  return <div />
}

const Settings: React.FC<Props> = ({ widgets }) => {
  const [widgetsCached, setWidgetsCached] = useState(widgets);
  const match = useRouteMatch();
  const { t } = useTranslation('widgetActions');
  const { community, updateSession } = useContext(SessionContext);

  const { widgetId }: any = useParams();
  const widget = widgetsCached.filter((w: Widget) => w.id === Number(widgetId))[0];

  if (!widget) return <Header.H2>{t('settings.empty')}</Header.H2>;

  const label = Labels.get(widget.kind);

  const updateCache = (updated: Widget) => {
    setWidgetsCached(widgets.map((w: Widget) => w.id === updated.id ? { ...w, ...updated } : w));
  }

  return (
    // - Nome da mobilização
    // - Editar/Configurações
    <Container
      title={widget.block.mobilization.name}
      navigation={({ push, is }: NavigationArgs) => (
        <DarkMode>
          {!isMobile ? (
            <Tab
              onClick={() => {
                if (process.env.REACT_APP_DOMAIN_ADMIN) {
                  updateSession("community", community).then(() => {
                    window.location.href = new URL(
                      `/mobilizations/${widget.block.mobilization.id}/edit`,
                      process.env.REACT_APP_DOMAIN_ADMIN
                    ).href;
                  });
                }
              }}
            >
              {t('settings.navigation.edit')}
            </Tab>
          ) : null}

          <Tab
            active={is(/\/widgets\/\d+\/settings\/*/)}
            onClick={() => push(`settings`)}
          >
            {t('settings.navigation.settings')}
          </Tab>
        </DarkMode>
      )}
    >
      {/* Corpo */}
      {!isMobile ? (
        <>
          <Heading
            as="h3"
            size="xl"
            mt={2.4}
            mb={2}
          >
            {t('settings.header', { label: label.title.toLowerCase() })}
          </Heading>

          <Navigation widget={widget} />
        </>
      ) : null}
      <Switch>
        <Route exact path={`${match.path}/adjusts`}>
          <Adjusts widget={widget} updateCache={updateCache} />
        </Route>
        <Route exact path={`${match.path}/autofire`}>
          <Autofire widget={widget} updateCache={updateCache} />
        </Route>
        <Route exact path={`${match.path}/finish`}>
          <ConfigurePostAction widget={widget} updateCache={updateCache} />
        </Route>
        {/* Render scenes to settings widget by kind */}
        <RoutesByKind widget={widget} updateCache={updateCache} />
      </Switch>
    </Container>
  );
};

export default Settings;
