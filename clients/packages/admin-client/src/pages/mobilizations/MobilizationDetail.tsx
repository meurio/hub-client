import React, { useContext, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Loading } from '../../components/await';
import { SidebarContext } from '../sidebar/Provider';
import MobilizationDetailProvider from './MobilizationDetailProvider';
// Pages
import MobilizationEditPage from './edit/page.connected';
import CreateBlockPage from './create-block';
import CreateTemplatePage from './create-template';
import ChooseTemplatePage from './choose-template';
import ChooseCustomTemplatePage from './choose-custom-template';
import LaunchPage from './launch';
import LaunchEndPage from './launch-end';

const MobilizationDetail: React.FC = () => {
  const { mobilization_id }: any = useParams();
  const { fetching, mobilization, selectMobilization, mobilizations } = useContext(SidebarContext);

  useEffect(() => {
    if (!fetching && (!mobilization || mobilization.id !== Number(mobilization_id))) {
      selectMobilization(Number(mobilization_id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, mobilizations.length]);

  return !mobilization
    ? <Loading />
    : (
      <MobilizationDetailProvider>
        <Route exact path='/mobilizations/:mobilization_id/edit' component={MobilizationEditPage} />
        <Route exact path='/mobilizations/:mobilization_id/launch' component={LaunchPage} />
        <Route exact path='/mobilizations/:mobilization_id/launch' component={LaunchEndPage} />
        <Route exact path='/mobilizations/:mobilization_id/blocks/create' component={CreateBlockPage} />
        <Route exact path='/mobilizations/:mobilization_id/templates/create' component={CreateTemplatePage} />
        <Route exact path='/mobilizations/:mobilization_id/templates/choose' component={ChooseTemplatePage} />
        <Route exact path='/mobilizations/:mobilization_id/templates/choose/custom' component={ChooseCustomTemplatePage} />
      </MobilizationDetailProvider>
    );
}

export default MobilizationDetail;