/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { toast } from 'react-toastify'
import AuthSelectors from 'account/redux/selectors';
import * as notifications from 'utils/notifications'

const asyncDownloadRecurringDonors = ({ id, name }) => (dispatch, getState, { api, intl }) => {
  const headers = AuthSelectors(getState()).getCredentials();

  const endpoint = `/communities/${id}/download_subscriptions.csv`
  const body = {}
  const options = { headers: headers }

  const filename = `[Relatório][DoadoresRecorrentes] ${name}.csv`
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

  // const warningOptions = { filename, notificationId }
  // dispatch(notify(notifications.reportDownloadInProgressWarning(intl, warningOptions)))

  return api
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        notifyError()
        return Promise.reject(false)
      } else if (status === 200) {
        if (data.length > 0) {
          notifySuccess()
          downloadjs(new Blob([data]), filename, 'text/csv')
          return Promise.resolve(true)
        }
      }
    })
    .catch(() => {
      notifyError()
      return Promise.reject(false)
    })
}

export default asyncDownloadRecurringDonors
