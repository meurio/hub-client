import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { SubmissionError } from 'redux-form'
import { toast } from 'react-toastify'
import GenericReduxForm from './GenericReduxForm'

const GenericMutationForm = ({
  mutation,
  variables,
  refetchQueries,
  updateQuery,
  onSuccess,
  parse,
  ...rest
}) => {
  const mutationProps = { mutation, refetchQueries }
  if (updateQuery && refetchQueries) {
    mutationProps.update = (cache, { data }) => {
      const { query, variables: queryVariables } = refetchQueries[0]
      const readQuery = () => cache.readQuery({ query, variables: queryVariables })
      const writeQuery = (writeData) => {
        cache.writeQuery({ query, data: writeData })
      }
      // updateQuery receive a readQuery on cache, writeQuery on cache and returning data
      updateQuery(readQuery, writeQuery, data)
    }
  }

  return (
    <Mutation {...mutationProps}>
      {(action) => (
        <GenericReduxForm
          {...rest}
          onSubmit={values => {
            const mutationProps = {
              variables: { ...variables, ...values }
            }
            if (parse) {
              mutationProps.variables = {
                ...mutationProps.variables,
                ...parse(values)
              }
            }
            return action(mutationProps)
              .then((args) => {
                if (typeof onSuccess === 'string') {
                  toast(onSuccess, { type: toast.TYPE.SUCCESS })
                  return Promise.resolve(args)
                }
                return onSuccess(args)
              })
              .catch((error) => {
                if (error && (error.form || error.fields)) {
                  let errors = {}
                  if (error.form) {
                    errors = { _error: error.form }
                  }
                  if (error.fields) {
                    errors = { ...errors, ...error.fields }
                  }
                  throw new SubmissionError(errors)
                }
              })
          }}
        />
      )}
    </Mutation>
  )
}

const { arrayOf, func, object, shape, string, oneOfType } = PropTypes

GenericMutationForm.propTypes = {
  mutation: oneOfType([func, object]).isRequired,
  variables: object,
  /* function to parsed variables before mutation is called. */
  parse: func,
  updateQuery: func,
  refetchQueries: arrayOf(shape({
    query: oneOfType([func, object]),
    variables: object
  })),
  onSuccess: oneOfType([func, string])
}

GenericMutationForm.defaultProps = {
  variables: {},
  onSuccess: 'Salvo com sucesso!'
}

export default GenericMutationForm
