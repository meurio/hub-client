import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { FormRedux } from 'components/forms'
import { Button } from 'ux/components'

if (require('exenv').canUseDOM) {
  require('./flat-form.scss')
  require('./button.scss')
}

const FlatForm = ({
  formClassNames,
  children,
  titleText,
  titleSmallMargin,
  titleMediumMargin,
  titleBigMargin,
  buttonText,
  hideButton,
  ...formProps
}) => (
  <FormRedux
    {...formProps}
    nosubmit
    className={classnames('ux--flat-form', formClassNames)}
  >
    {titleText && (
      <h1 className={classnames({
        'sm-margin': titleSmallMargin,
        'md-margin': titleMediumMargin,
        'lg-margin': titleBigMargin
      })}>
        {titleText}
      </h1>
    )}
    {children}
    {hideButton && <button type='submit' style={{ display: 'none' }} />}
    {!hideButton && <Button type='submit' disabled={!formProps.valid}>{buttonText}</Button>}
  </FormRedux>
)

FlatForm.propTypes = {
  formClassNames: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  titleText: PropTypes.string,
  titleSmallMargin: PropTypes.bool,
  titleMediumMargin: PropTypes.bool,
  titleBigMargin: PropTypes.bool
}

export default FlatForm
