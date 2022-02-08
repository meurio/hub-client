//
// @route /account/edit
//
import React, { useContext } from 'react'
import { reduxForm } from 'redux-form'
import { Context as SessionContext } from 'bonde-core-tools';

import Page from './page'

const fields = ['id', 'avatar', 'first_name', 'last_name', 'email']

const Form = reduxForm({ form: 'editUserForm', fields })(Page)

const ConnectedUser = () => {
  const { currentUser: user } = useContext(SessionContext);

  return (
    <Form
      submit={(values) => {
        console.log("Override submit: ", values);
      }}
      initialValues={{
        id: user.id,
        first_name: user.firstName || user.first_name,
        last_name: user.lastName || user.last_name,
        avatar: user.avatar || user.avatar_url,
        email: user.email
      }}
    />
  )
}

export default ConnectedUser;