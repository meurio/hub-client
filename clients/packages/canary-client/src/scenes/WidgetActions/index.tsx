import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Empty } from "bonde-components";
import { Context as SessionContext } from "bonde-core-tools";
import { useTranslation } from 'react-i18next';
import FetchWidgets, { RenderProps, WidgetLoading } from './FetchWidgets';
// Subroutes
import Home from './Home';
import Settings from './Settings';

type Props = {
  match: any;
};

const WidgetsActionsPage = ({ match }: Props): React.ReactElement => {
  const { community } = useContext(SessionContext);
  const { t } = useTranslation('widgetActions');

  return community ? (
    <FetchWidgets communityId={community?.id || 0}>
      {({ widgets, loading }: RenderProps) => (
        <Switch>
          <Route exact path={`${match.path}`}>
            <Home
              widgets={widgets}
              loading={loading}
              community={community}
            />
          </Route>
          <Route path={`${match.path}/:widgetId/settings`}>
            {loading
              ? <WidgetLoading />
              : <Settings widgets={widgets} />
            }
          </Route>
        </Switch>
      )}
    </FetchWidgets>
  ) : (
    <Empty message={t('empty')} />
  );
};

// TODO:
// - Translate

export default WidgetsActionsPage;
