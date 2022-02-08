import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'components/navigation'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from 'components/layout'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField
} from 'components/forms'
import { SettingsForm } from 'ux/components'
import * as Paths from 'paths'

const EditUserPage = ({
  fields: {
    avatar,
    first_name: firstName,
    last_name: lastName,
    email
  },
  ...formProps
}) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout
      title={
        <FormattedMessage
          id='page--account-edit.header.title'
          defaultMessage='Minha conta'
        />
      }
    >
      <Tabs>
        <Tab
          text={
            <FormattedMessage
              id='page--account-edit.header.tabs.user'
              defaultMessage='Usuário'
            />
          }
          path={Paths.editAccount()}
          isActive
        />
      </Tabs>
    </SettingsPageMenuLayout>
    <SettingsPageContentLayout>
      {/* TODO: Change FormRedux to be transparent by default */}
      <SettingsForm {...formProps}>
        <FormGroup controlId='avatarId' {...avatar}>
          <UploadImageField signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`} />
        </FormGroup>
        <FormGroup controlId='firstNameId' {...firstName}>
          <ControlLabel>
            <FormattedMessage
              id='page--account-edit.form.name.label'
              defaultMessage='Nome'
            />
          </ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='lastNameId' {...lastName}>
          <ControlLabel>
            <FormattedMessage
              id='page--account-edit.form.lastname.label'
              defaultMessage='Sobrenome'
            />
          </ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='emailId' {...email}>
          <ControlLabel>
            <FormattedMessage
              id='page--account-edit.form.email.label'
              defaultMessage='E-mail'
            />
          </ControlLabel>
          <FormControl type='email' />
        </FormGroup>
      </SettingsForm>
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

EditUserPage.propTypes = {
  // Injected by react-redux
  submit: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default EditUserPage
