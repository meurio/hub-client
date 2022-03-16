import React, { useContext, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Loading } from '../../../components/await';
import { SidebarContext } from '../sidebar/Provider';
import MobilizationDetailProvider from './MobilizationDetailProvider';
// Pages
import MobilizationEditPage from './edit/page.connected';
import BlockCreatePage from './blocks/create';

const MobilizationDetail: React.FC = () => {
  const { mobilization_id }: any = useParams();
  const { fetching, mobilization, selectMobilization } = useContext(SidebarContext);

  useEffect(() => {
    if (!fetching && (!mobilization || mobilization.id !== Number(mobilization_id))) {
      selectMobilization(Number(mobilization_id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  return !mobilization ? <Loading /> : (
    <MobilizationDetailProvider>
      <Route exact path='/mobilizations/:mobilization_id/edit' component={MobilizationEditPage} />
      <Route exact path='/mobilizations/:mobilization_id/blocks/create' component={BlockCreatePage} />
    </MobilizationDetailProvider>
  );
}

export default MobilizationDetail;