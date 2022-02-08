import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import { BondeBackground } from 'components/layout/background'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  FormError
} from 'components/forms'
import * as paths from 'paths'

class CommunityNewPage extends Component {
  componentWillReceiveProps (nextProps) {
    const { submitting } = this.props
    if (submitting && !nextProps.submitting && !nextProps.submitFailed) {
      this.props.history.push(paths.communityList())
    }
  }

  render () {
    const {
      image,
      fields: { name, city },
      intl,
      // Actions
      asyncCreate,
      submitError,
      clearError,
      ...formProps
    } = this.props
    return (
      <BondeBackground contentSize={3}>
        <div>
          <h1>
            <FormattedMessage
              id='page--community-new.title'
              defaultMessage='Crie uma comunidade'
            />
          </h1>
          <h2>
            <FormattedMessage
              id='page--community-new.subtitle'
              defaultMessage='Comunidades do Bonde são grupos de ação que trabalham juntos por uma causa.'
            />
          </h2>
          <FormRedux
            nosubmit
            className='bg-white rounded'
            onSubmit={values => {
              clearError()
              return asyncCreate(values)
            }}
            {...formProps}
          >
            <FormGroup controlId='nameId' {...name} submitError={submitError && submitError.name}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-new.form.name.label'
                  defaultMessage='Nome da comunidade'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={
                  intl.formatMessage({
                    id: 'page--community-new.form.name.placeholder',
                    defaultMessage: 'Exemplo: Movimento 90º São Paulo'
                  })
                }
              />
            </FormGroup>
            <FormGroup controlId='cityId' {...city} submitError={submitError && submitError.city}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-new.form.city.label'
                  defaultMessage='Cidade da comunidade'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={
                  intl.formatMessage({
                    id: 'page--community-new.form.city.placeholder',
                    defaultMessage: 'Exemplo: São Paulo'
                  })
                }
              />
            </FormGroup>
            <Button type='submit' className='btn py2 caps white col-12 rounded-bottom bg-pagenta'>
              {formProps.submitting ? (
                <FormattedMessage
                  id='page--community-new.form.submit-button.text.saving'
                  defaultMessage='Salvando'
                />
              ) : (
                <FormattedMessage
                  id='page--community-new.form.submit-button.text.default'
                  defaultMessage='Criar comunidade'
                />
             )}
            </Button>
            <FormError className='mt2' />
          </FormRedux>
        </div>
      </BondeBackground>
    )
  }
}

CommunityNewPage.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.object,
    city: PropTypes.object
  }).isRequired,
  submitting: PropTypes.bool,
  // Actions
  asyncCreate: PropTypes.func.isRequired,
  // Intl shape
  intl: intlShape.isRequired
}

export default CommunityNewPage
