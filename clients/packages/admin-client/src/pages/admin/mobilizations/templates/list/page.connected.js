//
// @route /mobilizations/templates/list
//
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import MobSelectors from 'mobrender/redux/selectors'
import { toggleMobilizationMenu } from 'mobrender/redux/action-creators'
import * as CommunitySelectors from 'community/selectors'
import * as TemplateActions from 'mobilizations/templates/action-creators'
import * as TemplateSelectors from 'mobilizations/templates/selectors'

import Page from './page'

const mapStateToProps = state => ({
  loaded: TemplateSelectors.isLoaded(state),
  loading: TemplateSelectors.isLoading(state),
  community: CommunitySelectors.getCurrent(state),
  menuActiveIndex: MobSelectors(state).getMobilizationMenuActive(),
  mobilizationTemplates: TemplateSelectors.getCustomTemplates(state)
})

const mapActionCreatorsToProps = {
  asyncDestroyTemplate: TemplateActions.asyncDestroyTemplate,
  toggleMenu: toggleMobilizationMenu,
  asyncFetch: TemplateActions.asyncFetch
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(injectIntl(Page))
