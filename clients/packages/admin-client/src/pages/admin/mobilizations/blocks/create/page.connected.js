// //
// // @route /mobilizations/:mobilization_id/blocks/create
// //
// import { connect } from 'react-redux';
// import MobSelectors from '../../../../../mobrender/redux/selectors';
// import { asyncAddBlock } from '../../../../../mobrender/redux/action-creators';
import React, { useContext } from "react"
import { useLocation } from "react-router-dom";
import { SidebarContext } from "../../../sidebar/Provider"
import Page from './page';

// const mapStateToProps = (state, props) => ({
//   mobilization: MobSelectors(state, props).getMobilization() || {},
// });

// const mapActionsToProps = { onCreateBlock: asyncAddBlock };

// export default connect(mapStateToProps, mapActionsToProps)(Page);

const BlockCreatePageConnected = () => {
  const { mobilization } = useContext(SidebarContext);
  const location = useLocation();

  const onCreateBlock = () => {
    console.log("TODO: add method to create block");
  }

  return (
    <Page
      mobilization={mobilization}
      onCreateBlock={onCreateBlock}
      location={location}
    />
  );
}

export default BlockCreatePageConnected;