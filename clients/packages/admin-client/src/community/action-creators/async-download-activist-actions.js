/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { toast } from 'react-toastify'
import * as notifications from 'utils/notifications'
import AuthSelectors from 'account/redux/selectors';

const asyncDownloadActivistActions = ({ id, name, ...community }) => (dispatch, getState, { api, intl }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  const filename = `[Relatório][Ações dos Ativistas] ${name}.csv`
  // const notificationId = Math.random()
  const notifySuccess = () => {
    toast.success(notifications.reportDownloadSuccess(intl, { filename }).message, { 
      autoClose: 5000,
      hideProgressBar: true,
    })
  }
  const notifyError = () => {
    toast.error(notifications.reportDownloadError(intl, { filename }).message, { 
      autoClose: 5000,
      hideProgressBar: true,
    })
  }

  // TO DO: remove before migration notification to react-toastify
  // const warningOptions = { filename, notificationId }
  // dispatch(notify(notifications.reportDownloadInProgressWarning(intl, warningOptions)))

  return api
    .get(`/communities/${id}/activist_actions.csv`, { headers })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        notifyError()
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          notifySuccess()
          downloadjs(new Blob([data]), filename, 'text/csv')
          return Promise.resolve()
        }
      }
    })
    .catch(error => {
      notifyError()
      Promise.reject(error)
    })
}

export default asyncDownloadActivistActions
