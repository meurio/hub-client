import React from 'react'
import { FormattedMessage } from 'react-intl'

import { FormFinishMessage } from 'mobilizations/widgets/components'
import { PressureTellAFriend } from 'mobilizations/widgets/__plugins__/pressure/components'

const PressureSettingsFinishPage = props => (
  <FormFinishMessage
    {...props}
    TellAFriend={PressureTellAFriend}
    successMessage={
      <FormattedMessage
        id='page--pressure-widget-finish.success-message'
        defaultMessage='Formulário de pós-pressão salvo com sucesso!'
      />
    }
  />
)

export default PressureSettingsFinishPage
