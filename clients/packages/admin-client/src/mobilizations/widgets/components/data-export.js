import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from 'ux/components'

class DataExport extends Component {
  componentDidMount () {
    const { dataExportMount } = this.props
    dataExportMount()
  }

  formatExportAt (widget) {
    const { exported_at: exportedAt } = widget
    const d = new Date(String(exportedAt))

    const pad = value => (`00${value}`).slice(-2)
    const date = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
    return (
      <FormattedMessage
        id='widgets.components--data-export.formated-export-at'
        defaultMessage='{date} às {time}'
        values={{ date, time }}
      />
    )
  }

  renderLoadingMessage () {
    return (
      <span>
        <i className='fa fa-circle-o-notch fa-spin fa-w mr1' />
        <FormattedMessage
          id='widgets.components--data-export.loading.message'
          defaultMessage='Aguarde enquanto estamos processando...'
        />
      </span>
    )
  }

  renderExportedMessage () {
    const { widget } = this.props
    return (
      <span className='olive'>
        <FormattedMessage
          id='widgets.components--data-export.exported.message'
          defaultMessage='Última exportação: {formatedExportAt}.'
          values={{ formatedExportAt: this.formatExportAt(widget) }}
        />
        <i className='fa fa-calendar-check-o ml1' />
      </span>
    )
  }

  renderErrorMessage () {
    const { error } = this.props
    return <span className='red'>{error}</span>
  }

  render () {
    const { mobilization, loading, error, widget, asyncWidgetDataExport } = this.props
    const filename = mobilization.name

    return (
      <div>
        <div className='table caps bold mb2 darkengray h6'>
          <i className='fa fa-file-excel-o darkengray table-cell align-middle h2' />
          <span className='table-cell align-middle pl1'>
            <FormattedMessage
              id='widgets.components--data-export.export.label'
              defaultMessage='Exportar'
            />
          </span>
        </div>

        <p className='h5 mb2 darkengray'>
          <FormattedMessage
            id='widgets.components--data-export.export.helper-text'
            defaultMessage={
              'Clique no botão abaixo para baixar o relatório completo do ' +
              'formulário em formato excel.'
            }
          />
        </p>

        <p className='mb2'>
          <Button
            disabled={loading}
            onClick={() => asyncWidgetDataExport({ mobilization, widget, filename })}
          >
            <FormattedMessage
              id='widgets.components--data-export.export.button'
              defaultMessage='Clique para baixar a planilha completa.'
            />
          </Button>
        </p>

        <div className='mb3'>
          {(loading ? this.renderLoadingMessage() : null)}
          {(widget.exported_at && !loading ? this.renderExportedMessage() : null)}
          {(error ? this.renderErrorMessage() : null)}
        </div>
      </div>
    )
  }
}

DataExport.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetDataExport: PropTypes.func.isRequired,
  dataExportMount: PropTypes.func.isRequired
}

export default DataExport
