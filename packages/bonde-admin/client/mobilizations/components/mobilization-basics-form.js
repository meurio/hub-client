import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { addNotification as notify } from 'reapop'
import { FormattedMessage, intlShape } from 'react-intl'
import DefaultServerConfig from '~server/config'
import { slugUpdatedMessage } from '~client/utils/notifications'
import { slugify } from '~client/utils/string-helper'
import { SettingsForm } from '~client/ux/components'
import { Code } from '~client/components/markdown'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  UploadImageField
} from '~client/components/forms'
import * as paths from '~client/paths'

export const MobilizationBasicsForm = ({
  fields: { name, slug, goal, favicon },
  floatSubmit,
  intl,
  ...formProps
}) => {
  const ComponentForm = floatSubmit ? SettingsForm : FormRedux
  const { location: { pathname } } = formProps
  const isNewMobilizationPath = pathname === paths.newMobilization()

  return (
    <ComponentForm {...formProps}>
      <FormGroup
        {...name}
        controlId='name'
        onBlur={event => {
          if (!slug.value) slug.onChange(slugify(name.value))
          name.onBlur(event)
        }}
      >
        <ControlLabel maxLength={100}>
          <FormattedMessage
            id='mobilizations.components--basics-form.name.label'
            defaultMessage='Nome'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={
            intl.formatMessage({
              id: 'mobilizations.components--basics-form.name.placeholder',
              defaultMessage: 'Ex: Pela criação de uma delegacia de desaparecidos'
            })
          }
          maxLength={100}
        />
      </FormGroup>
      <FormGroup controlId='goal' {...goal}>
        <ControlLabel maxLength={500}>
          <FormattedMessage
            id='mobilizations.components--basics-form.goal.label'
            defaultMessage='Objetivo'
          />
        </ControlLabel>
        <FormControl
          componentClass='textarea'
          placeholder={
            intl.formatMessage({
              id: 'mobilizations.components--basics-form.goal.placeholder',
              defaultMessage: 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.'
            })
          }
          maxLength={500}
          rows='4'
        />
      </FormGroup>
      <FormGroup
        {...slug}
        controlId='slug'
        className={classnames({ hide: isNewMobilizationPath })}
      >
        <ControlLabel maxLength={63}>
          <FormattedMessage
            id='mobilizations.components--basics-form.slug.label'
            defaultMessage='Identificador Único'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='mobilizations.components--basics-form.slug.helper-text'
            defaultMessage={
              'O valor desse campo é utilizado para referenciar a mobilização no domínio do BONDE, ' +
              'por exemplo: {example}'
            }
            values={{ example: <Code bordered>www.123-nome-da-mob.bonde.org</Code> }}
          />
        </HelpBlock>
        <FormControl
          type={isNewMobilizationPath ? 'hidden' : 'text'}
          maxLength={63}
          placeholder={
            intl.formatMessage({
              id: 'mobilizations.components--basics-form.slug.helper-example',
              defaultMessage: 'Ex: 123-nome-da-mob'
            })
          }
        />
      </FormGroup>
      <FormGroup
        {...favicon}
        controlId='favicon'
        className={classnames({ hide: isNewMobilizationPath })}
      >
        <ControlLabel>Favicon</ControlLabel>
        <UploadImageField
          signingUrl={`${DefaultServerConfig.apiUrl}/uploads`}
          type={isNewMobilizationPath ? 'hidden' : 'text'}
        />
      </FormGroup>
    </ComponentForm>
  )
}

export const fields = ['name', 'slug', 'goal', 'favicon', 'community_id']

export const validate = (values, { intl }) => {
  const errors = {}
  if (!values.name) {
    errors.name = intl.formatMessage({
      id: 'mobilizations.components--basics-form.name.validation.required',
      defaultMessage: 'Insira o nome da mobilização'
    })
  } else if (values.name.length > 100) {
    errors.name = intl.formatMessage({
      id: 'mobilizations.components--basics-form.name.validation.max-length',
      defaultMessage: 'Seu título está muito longo!'
    })
  }

  if (!values.goal) {
    errors.goal = intl.formatMessage({
      id: 'mobilizations.components--basics-form.goal.validation.required',
      defaultMessage: 'Insira o objetivo da mobilização'
    })
  } else if (values.goal.length > 500) {
    errors.goal = intl.formatMessage({
      id: 'mobilizations.components--basics-form.goal.validation.max-length',
      defaultMessage: 'O limite de caracteres foi atingido.'
    })
  }

  if (values.slug && values.slug.length > 63) {
    errors.slug = intl.formatMessage({
      id: 'mobilizations.components--basics-form.slug.validation.max-length',
      defaultMessage: 'Seu identificador único está muito longo!'
    })
  }

  return errors
}

const mapActionsCreators = (dispatch, props) => ({
  ...props,
  submit: values => {
    props.submit(values)
      .then(mobilization => {
        const { mobilization: { slug: slugInitial }, onFinishSubmit } = props
        const { slug: slugResult } = mobilization
        const hasSlugUpdated = slugInitial && slugInitial !== slugResult

        hasSlugUpdated && dispatch(notify(slugUpdatedMessage(props.intl)))
        onFinishSubmit && onFinishSubmit(mobilization)
      })
      .catch(errors => {
        dispatch({ errors, type: 'redux-form/STOP_SUBMIT', form: props.formName })
      })
  }
})

MobilizationBasicsForm.propTypes = {
  intl: intlShape.isRequired
}

export default connect(undefined, mapActionsCreators)(MobilizationBasicsForm)
