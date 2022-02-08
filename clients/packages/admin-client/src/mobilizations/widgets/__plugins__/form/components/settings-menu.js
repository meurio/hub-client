import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as paths from 'paths'
import { Tabs, Tab } from 'components/navigation/tabs'
import { SettingsPageMenuLayout } from 'components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const fieldsPath = paths.fieldsMobilizationWidget(mobilization.id, widget.id)
  const formPath = paths.formMobilizationWidget(mobilization.id, widget.id)
  const formAutofirePath = paths.formAutofire(mobilization.id, widget.id)
  const formExportPath = paths.formExport(mobilization.id, widget.id)
  const finishPath = paths.widgetFormSettingsFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='form-widget.components--settings-menu.title'
          defaultMessage='Configure o formulário da sua ação'
        />
      }
    >
      <Tabs>
        <Tab
          path={formPath}
          isActive={formPath === location.pathname}
          text={
            <FormattedMessage
              id='form-widget.components--settings-menu.items.adjusts'
              defaultMessage='Ajustes'
            />
          }
        />
        <Tab
          path={fieldsPath}
          isActive={fieldsPath === location.pathname}
          text={
            <FormattedMessage
              id='form-widget.components--settings-menu.items.fields'
              defaultMessage='Campos do formulário'
            />
          }
        />
        <Tab
          path={formAutofirePath}
          isActive={formAutofirePath === location.pathname}
          text={
            <FormattedMessage
              id='form-widget.components--settings-menu.items.autofire'
              defaultMessage='Mensagem agradecimento'
            />
          }
        />
        <Tab
          path={formExportPath}
          isActive={formExportPath === location.pathname}
          text={
            <FormattedMessage
              id='form-widget.components--settings-menu.items.report'
              defaultMessage='Relatório'
            />
          }
        />
        <Tab
          path={finishPath}
          isActive={finishPath === location.pathname}
          text={
            <FormattedMessage
              id='form-widget.components--settings-menu.items.post-action'
              defaultMessage='Pós-inscrição'
            />
          }
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default SettingsMenu
