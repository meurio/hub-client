import React, { useState } from "react";
import { Tab, Header } from "bonde-components";
import { useParams, useRouteMatch, Route, Switch } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import { useTranslation } from 'react-i18next';
import { useSession } from 'bonde-core-tools';
import Container, { NavigationArgs } from "../Container";
import { Widget } from "../FetchWidgets";
import Labels from "../Labels";
import Navigation from './Navigation';
import Adjusts from './Adjusts';
import Autofire from "./Autofire";
import ConfigurePressureTargets from "./ConfigurePressureTargets";
import ConfigurePostAction from "./ConfigurePostAction";
import Sending from "./Sending";

type Props = {
  widgets: Widget[];
};

const Settings = ({ widgets }: Props) => {
  const [widgetsCached, setWidgetsCached] = useState(widgets);
  const match = useRouteMatch();
  const { t } = useTranslation('widgetActions');
  const { community, storage } = useSession();

  const { widgetId }: any = useParams();
  const widget = widgetsCached.filter((w: Widget) => w.id === Number(widgetId))[0];

  if (!widget) return <Header.H2>{t('settings.empty')}</Header.H2>;

  const label = Labels.get(widget.kind);

  const updateCache = (updated: Widget) => {

    setWidgetsCached(widgets.map((w: Widget) => w.id === updated.id ? updated : w));
  }

  return (
    // - Nome da mobilização
    // - Editar/Configurações
    <Container
      title={widget.block.mobilization.name}
      navigation={({ push, is }: NavigationArgs) => (
        <>
          <Tab
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                storage.setAsyncItem("community", community).then(() => {
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
       
          <Tab
            active={is(/\/widgets\/\d+\/settings\/*/)}
            onClick={() => push(`settings`)}
          >
            {t('settings.navigation.settings')}
          </Tab>
        </>
      )}
    >
      {/* Corpo */}
      <Row style={{ marginBottom: "20px" }}>
        <Col xs={12}>
          <Header.H3>{t('settings.header', { label: label.title.toLowerCase() })}</Header.H3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Navigation />
        </Col>
        <Col xs={12}>
          <Switch>
            <Route exact path={`${match.path}`}>
              {widget.kind === "pressure" && (
                <ConfigurePressureTargets
                  widget={widget}
                  updateCache={updateCache}
                />
              )}
            </Route>
            <Route exact path={`${match.path}/sending`}>
              <Sending widget={widget}/>
            </Route>
            <Route exact path={`${match.path}/adjusts`}>
              <Adjusts widget={widget} />
            </Route>
            <Route exact path={`${match.path}/autofire`}>
              <Autofire widget={widget} />
            </Route>
            <Route exact path={`${match.path}/finish`}>
              <ConfigurePostAction widget={widget} />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
