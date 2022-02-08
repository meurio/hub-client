import React from 'react'
import axios from 'axios'
import { reduxForm } from 'redux-form'
import { FlatForm } from 'ux/components'
import { FormGroup, ControlLabel, FormControl } from 'components/forms'
import Summary from './summary'

var styles = require('exenv').canUseDOM ? require('./facebook-bot-mass-message-form.scss') : {}

const FacebookBotMassMessageForm = ({
  fields: {
    name,
    message,
    quick_reply_redirect: quickReplyRedirect,
    quick_reply_button_text: quickReplyButtonText
  },
  totalImpactedActivists,
  changeParentState,
  segmentation,
  ...formProps
}) => (
  <FlatForm
    {...formProps}
    buttonText='Enviar mensagem'
    style={{ paddingTop: '.5rem', position: 'relative' }}
    submit={({
      name,
      message: text,
      quick_reply_redirect: quickReplyRedirect,
      quick_reply_button_text: quickReplyButtonText
    }) => {
      changeParentState({ loading: true })

      const url = `${process.env.REACT_APP_DOMAIN_BETA}/enqueue-mass-messages`
      const payload = {
        ...segmentation,
        facebookBotConfigurationId: 1, // TODO: It needs to be fixed!
        name,
        totalImpactedActivists,
        text,
        quickReplyRedirect,
        quickReplyButtonText
      }

      axios.post(url, payload)
        .then(() => changeParentState({ hasEnqueued: true, loading: false }))
        .catch(err => console.error(err))
    }}
  >
    <button
      type='button'
      title='Voltar'
      className={styles.backButton}
      onClick={e => {
        e.preventDefault()
        changeParentState({ searchFinished: false })
      }}
    >
      <i className='fa fa-chevron-left' />
    </button>

    <FormGroup className='mb2' controlId='name' {...name}>
      <ControlLabel>Nome da Campanha</ControlLabel>
      <FormControl
        type='text'
        placeholder='Ex: Campanha de Pressão Contra a PEC 181 (1º envio)'
      />
    </FormGroup>

    <FormGroup className='mb2' controlId='message' {...message}>
      <ControlLabel>Mensagem</ControlLabel>
      <FormControl
        rows='10'
        componentClass='textarea'
        placeholder='Digite aqui a mensagem que você deseja enviar para os usuários segmentados.'
        style={{ height: 90 }}
      />
    </FormGroup>

    <div className='clearfix col-12 mb2'>
      <FormGroup className='col col-6' controlId='quickReplyRedirect' {...quickReplyRedirect}>
        <ControlLabel>Quick Reply</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: QUICK_REPLY_C'
        />
      </FormGroup>

      <FormGroup className='col col-6' controlId='quickReplyButtonText' {...quickReplyButtonText}>
        <ControlLabel>Texto do botão</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: #SemRodeios'
        />
      </FormGroup>
    </div>

    <Summary value={totalImpactedActivists} />
  </FlatForm>
)

export const form = 'facebookBotMassMessageForm'
export const fields = ['name', 'message', 'quick_reply_redirect', 'quick_reply_button_text']
export const validate = values => {
  const errors = {}
  const {
    name,
    message,
    quick_reply_redirect: quickReplyRedirect,
    quick_reply_button_text: quickReplyButtonText
  } = values

  if (!name) errors.name = 'Obrigatório'

  if (!message) errors.message = 'Obrigatório'

  if (quickReplyRedirect && !quickReplyButtonText) {
    errors.quick_reply_button_text = 'Preencha'
  }
  if (!quickReplyRedirect && quickReplyButtonText) {
    errors.quick_reply_redirect = 'Preencha'
  }

  return errors
}
export default reduxForm({ form, fields, validate })(FacebookBotMassMessageForm)
