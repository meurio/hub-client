import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form'

import { FormGroup, ControlLabel, FormControl, UploadImageField } from 'components/forms'

const FormShare = ({
  FormComponent,
  fields: {
    facebook_share_image: facebookShareImage,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    twitter_share_text: twitterShareText
  },
  intl,
  ...formProps
}) => (
  <FormComponent {...formProps}>
    <div className='h6 caps bold mb2 inline'>
      <i className='fa fa-facebook-square align-middle' style={{ color: '#3b5998' }} />
      <span className='align-middle pl2'>
        <FormattedMessage
          id='mobilizations.components--form-share.facebook.title'
          defaultMessage='Share de Facebook'
        />
      </span>
    </div>
    <p className='mb1 lightgray'>
      <FormattedMessage
        id='mobilizations.components--form-share.facebook.helper-text'
        defaultMessage='Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação. É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)'
      />
    </p>
    <p className='mb3 lightgray'>
      <FormattedMessage
        id='mobilizations.components--form-share.facebook.fb.image.helper-text'
        defaultMessage='Use imagens com pelo menos 1200x630 pixels para a melhor exibição em dispositivos de alta resolução. No mínimo, você deve usar imagens que tenham 600x315 pixels para exibir publicações na página com link com imagens maiores. O tamanho máximo das imagens é de 8 MB.'
      />
      &nbsp;
      <a
        href='https://developers.facebook.com/docs/sharing/best-practices#images'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FormattedMessage
          id='mobilizations.components--form-share.facebook.fb.image.link'
          defaultMessage='Saiba mais'
        />
        <i className='fa fa-external-link' style={{ fontSize: 12 }} />
      </a>.
    </p>

    <div className='clearfix col-12'>
      <FormGroup
        contorlId='facebookShareImage'
        className='facebook-share-image col col-5'
        {...facebookShareImage}
      >
        <ControlLabel>
          <FormattedMessage
            id='mobilizations.components--form-share.facebook.form.share-image.label'
            defaultMessage='Imagem'
          />
        </ControlLabel>
        <UploadImageField signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`} />
      </FormGroup>

      <div className='facebook-share-title-container col col-7'>
        <FormGroup
          {...facebookShareTitle}
          controlId='facebookShareTitle'
          className='facebook-share-title'
          style={{ paddingLeft: '0' }}
        >
          <ControlLabel className='ml1' maxLength={70}>
            <FormattedMessage
              id='mobilizations.components--form-share.facebook.form.share-title.label'
              defaultMessage='Título do post'
            />
          </ControlLabel>
          <FormControl
            componentClass='textarea'
            rows={2}
            maxLength={70}
            placeholder={
              intl.formatMessage({
                id: 'mobilizations.components--form-share.facebook.form.share-title.placeholder',
                defaultMessage: 'Um título direto que passe a ideia da sua mobilização'
              })
            }
          />
        </FormGroup>

        <FormGroup
          controlId='facebookShareDescription'
          className='facebook-share-description'
          style={{ paddingLeft: '0' }}
          {...facebookShareDescription}
        >
          <ControlLabel className='ml1' maxLength={90}>
            <FormattedMessage
              id='mobilizations.components--form-share.facebook.form.share-description.label'
              defaultMessage='Subtítulo do post'
            />
          </ControlLabel>
          <FormControl
            componentClass='textarea'
            rows={4}
            maxLength={90}
            placeholder={
              intl.formatMessage({
                id: 'mobilizations.components--form-share.facebook.form.share-description.placeholder',
                defaultMessage: 'Complete a informação do título e chame o leitor para a mobilização'
              })
            }
          />
        </FormGroup>
      </div>
    </div>

    <div className='separator' />

    <div className='clearfix col col-12'>
      <div className='h6 caps bold mb2 inline'>
        <i className='fa fa-twitter align-middle' style={{ color: '#1da1f2' }} />
        <span className='align-middle pl2'>
          <FormattedMessage
            id='mobilizations.components--form-share.twitter.title'
            defaultMessage='Share de Twitter'
          />
        </span>
      </div>
      <p className='mb2 lightgray'>
        <FormattedMessage
          id='mobilizations.components--form-share.twitter.helper-text'
          defaultMessage='Configure a mensagem que será publicada no Twitter sempre que alguém compartilhar sua mobilização.'
        />
      </p>

      <FormGroup
        controlId='twitterShareText' {...twitterShareText}
        className='twitter-share-text'
      >
        <ControlLabel maxLength={280}>
          <FormattedMessage
            id='mobilizations.components--form-share.twitter.form.share-text.label'
            defaultMessage='Texto do Tweet'
          />
        </ControlLabel>
        <FormControl
          componentClass='textarea'
          rows={5}
          maxLength={280}
          placeholder={
            intl.formatMessage({
              id: 'mobilizations.components--form-share.twitter.form.share-text.placeholder',
              defaultMessage: 'Insira uma frase e chame o leitor para a mobilização'
            })
          }
        />
      </FormGroup>
    </div>
  </FormComponent>
)

FormShare.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  fields: PropTypes.shape({
    facebook_share_image: PropTypes.object.isRequired,
    facebook_share_title: PropTypes.object.isRequired,
    facebook_share_description: PropTypes.object.isRequired,
    twitter_share_text: PropTypes.object.isRequired
  }).isRequired,
  // translation
  intl: intlShape.isRequired
}

const fields = [
  'id',
  'facebook_share_image',
  'facebook_share_title',
  'facebook_share_description',
  'twitter_share_text'
]

export default (
  mapStateToProps = () => {},
  mapDispatchToProps = {},
  validate = () => ({})
) => reduxForm(
  { form: 'mobilizationShareForm', fields, validate },
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(FormShare))
