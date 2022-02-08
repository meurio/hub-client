import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import type { Widget } from '../../FetchWidgets';
import ConfigurePressureTargets from "./ConfigurePressureTargets";
import PerformanceScene from './Performance';
import Sending from "./Sending";

interface Props {
  widget: Widget
  updateCache: (updated: Widget) => void
}

const PressureScene: React.FC<Props> = ({ widget, updateCache }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <PerformanceScene widget={widget} />
      </Route>
      <Route exact path={`${match.path}/targets`}>
        <ConfigurePressureTargets
          widget={widget}
          updateCache={updateCache}
        />
      </Route>
      <Route exact path={`${match.path}/sending`}>
        <Sending widget={widget} updateCache={updateCache} />
      </Route>
    </Switch>
  )
}

export default PressureScene;