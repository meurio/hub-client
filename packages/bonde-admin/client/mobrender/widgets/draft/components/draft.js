import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import DraftButton from './draft-button'
import widgets from '~client/mobrender/widgets/config'

if (require('exenv').canUseDOM) require('./draft.scss')

const Draft = ({ mobilization, widget, update, intl }) => {
  const updateKind = props => update({...widget, ...props})
  const widgetsConfig = widgets(mobilization, widget, { intl }).filter(w => w.kind !== 'draft')

  return (
    <div className='draft-widget widget center rounded lightgray clearfix'>
      {widgetsConfig.map((wc, index) => {
        const props = Object.assign({}, wc)
        delete props.component
        return <DraftButton key={`wc-${index}`} updateKind={updateKind} {...props} />
      })}
    </div>
  )
}

Draft.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Draft)
