/* eslint-disable prefer-promise-reject-errors */
import downloadjs from 'downloadjs'
import { toast } from 'react-toastify'
import * as notifications from 'utils/notifications'
import AuthSelectors from 'account/redux/selectors';

const asyncDownloadDonations = ({ id, name, ...community }) => (dispatch, getState, { api, intl }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  const filename = `[Relatório][Doação] ${name}.csv`
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
  // dispatch(toast(notifications.reportDownloadInProgressWarning(intl, warningOptions)))

  return api
    .get(`/communities/${id}/donation_reports.csv`, { headers })
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

export default asyncDownloadDonations
