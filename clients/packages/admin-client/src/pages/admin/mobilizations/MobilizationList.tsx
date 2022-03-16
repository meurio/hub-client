import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { SidebarContext } from '../sidebar/Provider';
import Page from './list/page';

const MobilizationList = () => {
  const location = useLocation();
  const history = useHistory();
  const { mobilizations, selectMobilization, changeStatus } = useContext(SidebarContext);

  useEffect(() => {
    const status: any = new URLSearchParams(location.search).get("status");
    changeStatus(status || 'active');
  }, [location.search, changeStatus]);


  return (
    <Page
      select={selectMobilization}
      mobilizations={mobilizations}
      location={location}
      history={history}
      toggleMenu={() => {}}
    />
  );
}

export default MobilizationList;