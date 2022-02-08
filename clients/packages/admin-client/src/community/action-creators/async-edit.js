/* eslint-disable prefer-promise-reject-errors */
// import * as t from 'community/action-types'
import AuthSelectors from 'account/redux/selectors';

const asyncEdit = ({ id, ...community }) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState())

  // ensure that the document number value have only numbers
  if (community.recipient) {
    const { bank_account: bankAccount } = community.recipient
    const { document_number: documentNumber } = bankAccount
    community.recipient.bank_account = {
      ...bankAccount,
      document_number: String(documentNumber).replace(/\D/g, '')
    }
  }

  return api
    .put(`/communities/${id}`, { community }, { headers })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        console.log("remover esse metodo");
        // return crossStorage
        //   .onConnect()
        //   .then(() => {
        //     return crossStorage
        //       .set('community', JSON.stringify(data))
        //       .then(() => {
        //         dispatch({ type: t.EDIT, community: data })
        //         return Promise.resolve()
        //       })
        //   })
      }
    })
    .catch(obj => {
      if (obj.response && obj.response.data && obj.response.data.errors) {
        if (typeof obj.response.data.errors === 'object') {
          const error = Object.values(obj.response.data.errors)[0]
          return Promise.reject({ _error: error })
        }
        return Promise.reject({ _error: obj.response.data.errors })
      }
      return Promise.reject({ _errors: obj })
    })
}

export default asyncEdit
