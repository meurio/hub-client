import React, {
  useContext,
  useEffect
} from 'react';
import {
  useLocation,
  // useParams,
  useHistory
} from 'react-router-dom';
import { SidebarContext } from '../sidebar/Provider';
import Page from './list/page';

interface Properties {
  status?: 'active' | 'archived'
}

const MobilizationList: React.FC<Properties> = ({ status }) => {
  const location = useLocation();
  const history = useHistory();
  const {
    mobilizations,
    selectMobilization,
    changeStatus
  } = useContext(SidebarContext);

  useEffect(() => {
    changeStatus(status || 'active');
  }, [status, changeStatus]);


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