//
// @route /mobilizations/templates/list
//
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Context as SessionContext } from 'bonde-core-tools';

import MobSelectors from 'mobrender/redux/selectors';
import { toggleMobilizationMenu } from 'mobrender/redux/action-creators';
import * as TemplateActions from 'mobilizations/templates/action-creators';
import * as TemplateSelectors from 'mobilizations/templates/selectors';

import Page from './page';

const mapStateToProps = state => ({
  loaded: TemplateSelectors.isLoaded(state),
  loading: TemplateSelectors.isLoading(state),
  menuActiveIndex: MobSelectors(state).getMobilizationMenuActive(),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = {
  asyncDestroyTemplate: TemplateActions.asyncDestroyTemplate,
  toggleMenu: toggleMobilizationMenu,
  asyncFetch: TemplateActions.asyncFetch
}

const CommunityConnected = (props) => {
  const { community } = useContext(SessionContext);

  return (
    <Page {...props} community={community} />
  )
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(injectIntl(CommunityConnected))
