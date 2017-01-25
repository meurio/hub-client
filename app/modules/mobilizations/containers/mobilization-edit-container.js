import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { Loading } from '../../../scripts/Dashboard/components'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'

// Children modules dependencies
import {
  actions as BlockActions,
  selectors as BlockSelectors
} from '../blocks'
import {
  actions as WidgetActions,
  selectors as WidgetSelectors
} from '../../widgets'

// Current module dependencies
import * as MobilizationSelectors from '../selectors'

class MobilizationEditContainer extends Component {
  static fetchData (store, params) {
    const promises = []
    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!WidgetSelectors.isLoaded(store.getState())) {
      const action = WidgetActions.asyncWidgetFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    return Promise.all(promises)
  }

  componentDidMount () {
    // TODO this callback is a workaround to load data in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // data only in the server-side for now
    const { mobilization, asyncBlockFetch, asyncWidgetFetch } = this.props
    asyncBlockFetch(mobilization.id)
    asyncWidgetFetch(mobilization.id)
  }

  render () {
    const {
      children,
      blocksIsLoaded,
      widgetsIsLoaded,
      widgetsIsSaving,
      blockIsRequesting,
      mobilization
    } = this.props

    const fonts = [
      mobilization.header_font,
      mobilization.body_font
    ].filter(arrayUtil.distinct)

    const isLoaded = blocksIsLoaded && widgetsIsLoaded
    const isLoading = widgetsIsSaving || blockIsRequesting

    return (
      <div className='flex flex-auto overflow-hidden'>
        {isLoading && <Loading />}
        {isLoaded ? children : <Loading />}
        <GoogleFontsLoader fonts={fonts} />
      </div>
    )
  }
}

MobilizationEditContainer.propTypes = {
  blocksIsLoaded: PropTypes.bool.isRequired,
  blocksIsRequesting: PropTypes.bool.isRequired,
  widgetsIsSaving: PropTypes.bool.isRequired,
  widgetsIsLoaded: PropTypes.bool.isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header_font: PropTypes.string,
    body_font: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getCurrent(state),
  blocksIsLoaded: BlockSelectors.isLoaded(state),
  blocksIsLoading: BlockSelectors.isLoading(state),
  blockIsRequesting: BlockSelectors.isRequesting(state),
  widgetsIsLoaded: WidgetSelectors.isLoaded(state),
  widgetsIsSaving: WidgetSelectors.isSaving(state)
})

const mapActionCreatorsToProps = {
  asyncBlockFetch: BlockActions.asyncBlockFetch,
  asyncWidgetFetch: WidgetActions.asyncWidgetFetch
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationEditContainer)
