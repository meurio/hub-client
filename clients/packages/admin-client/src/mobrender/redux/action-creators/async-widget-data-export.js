/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import downloadjs from 'downloadjs'
import AuthSelectors from 'account/redux/selectors';
import { createAction } from './create-action'

const asyncWidgetDataExport = params => (dispatch, getState, { api, intl }) => {
  const headers = AuthSelectors(getState()).getCredentials();
  const { mobilization, widget, filename } = params

  const endpoint = `/mobilizations/${mobilization.id}/form_entries.csv`
  const config = {
    headers,
    params: {
      widget_id: widget.id,
      INFO: 'disjoint_fields'
    }
  }

  dispatch({ type: t.EXPORT_DATACLIP_REQUEST })
  return api.get(endpoint, config)
    .then(({ data }) => {
      if (!data.length) {
        window.alert(intl.formatMessage({
          id: 'action--async-widget-data-export.no-data',
          defaultMessage: 'Nao foi encontrado nenhum dado para ser exportado'
        }))
        dispatch({ type: t.EXPORT_DATACLIP_NO_DATA_FOUND })
        return Promise.resolve()
      }

      downloadjs(new Blob([data]), `[Relatório][Formulário] ${filename}.csv`, 'text/csv')
      dispatch(createAction(t.EXPORT_DATACLIP_SUCCESS, { widget }))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.EXPORT_DATACLIP_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncWidgetDataExport
