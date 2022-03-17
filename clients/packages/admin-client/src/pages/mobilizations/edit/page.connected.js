import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarContext } from '../../sidebar/Provider';
import { MobilizationDetailContext } from '../MobilizationDetailProvider';
import Page from './page';

const MobilizationEditConnected = (props) => {
  const { mobilization } = useContext(SidebarContext);
  const { blocks, widgets } = useContext(MobilizationDetailContext);
  const history = useHistory();

  const pageProps = {
    ...props,
    history,
    mobilization,
    blocks,
    widgets
  }

  return <Page {...pageProps} />;
}

export default MobilizationEditConnected;
