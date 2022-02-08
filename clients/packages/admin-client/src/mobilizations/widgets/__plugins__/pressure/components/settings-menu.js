import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'
import { SettingsPageMenuLayout } from 'components/layout'

const SettingsMenu = ({ location, mobilization, widget }) => {
  const pressurePath = paths.pressure(mobilization.id, widget.id)
  const pressureEmailPath = paths.pressureEmail(mobilization.id, widget.id)
  const pressureAutofirePath = paths.pressureAutofire(mobilization.id, widget.id)
  const pressureFinishPath = paths.pressureFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='pressure-widget.components--settings-menu.title'
          defaultMessage='Configure seu formulário de pressão'
        />
      }
    >
      <Tabs>
        <Tab
          path={pressurePath}
          isActive={pressurePath === location.pathname}
          text={
            <FormattedMessage
              id='pressure-widget.components--settings-menu.items.form'
              defaultMessage='Ajustes'
            />
          }
        />
        <Tab
          path={pressureEmailPath}
          isActive={pressureEmailPath === location.pathname}
          text={
            <FormattedMessage
              id='pressure-widget.components--settings-menu.items.pressure-email'
              defaultMessage='E-mail para alvo'
            />
          }
        />
        {widget.kind !== 'pressure-phone' && (
          <Tab
            path={pressureAutofirePath}
            isActive={pressureAutofirePath === location.pathname}
            text={
              <FormattedMessage
                id='pressure-widget.components--settings-menu.items.autofire'
                defaultMessage='Mensagem de agradecimento'
              />
            }
          />
        )}
        <Tab
          path={pressureFinishPath}
          isActive={pressureFinishPath === location.pathname}
          text={
            <FormattedMessage
              id='pressure-widget.components--settings-menu.items.post-action'
              defaultMessage='Pós-pressão'
            />
          }
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  widget: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
}

export default SettingsMenu
