import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import type { Widget } from "../../FetchWidgets";
import PerformanceScene from "./PerformanceScene";
import QRScene from "./QRScene";

interface Properties {
  widget: Widget
}

const PlipsHomeScene: React.FC<Properties> = ({ widget }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <PerformanceScene widget={widget} />
      </Route>
      <Route path={`/widgets/${widget.id}/settings/workflow`}>
        <QRScene widget={widget} />
      </Route>
    </Switch>
  )
}

export default PlipsHomeScene;