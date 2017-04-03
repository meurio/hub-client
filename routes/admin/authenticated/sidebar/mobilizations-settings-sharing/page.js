import React from 'react'

// Global module dependencies
import {
  FormGroup,
  ControlLabel,
  FormControl,
  UploadImageField
} from '~client/components/forms'
import DefaultServerConfig from '~server/config'

// Current module dependencies
let iconFacebook, iconTwitter

if (require('exenv').canUseDOM) {
  iconFacebook = require('~client/mobilizations/images/facebook.svg')
  iconTwitter = require('~client/mobilizations/images/twitter.svg')
}
import { SettingsMenu } from '~client/mobilizations/components'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import SettingsForm from '~client/components/settings-form'

const MobilizationsSettingsSharingPage = props => {
  const {
    fields: {
      facebook_share_image: facebookShareImage,
      facebook_share_title: facebookShareTitle,
      facebook_share_description: facebookShareDescription,
      twitter_share_text: twitterShareText
    },
    ...formProps
  } = props

  return (
    <SettingsPageLayout>
      <SettingsMenu {...props} />
      <SettingsPageContentLayout>
        <SettingsForm {...formProps}>
          <div className='h5 caps bold mb2 inline'>
            <img className='align-middle' src={iconFacebook} width='32' height='32' />
            <span className='align-middle pl2 h6'>Share de Facebook</span>
          </div>
          <p className='mb2 lightgray'>
            Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação.
            É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)
          </p>

          <FormGroup
            contorlId='facebookShareImage'
            className='form-group col col-5 mb3'
            style={{ paddingRight: '.7rem' }}
            {...facebookShareImage}
          >
            <ControlLabel>Imagem</ControlLabel>
            <div
              className='border border-gray94 rounded p2 bg-white center relative overflow-hidden'
              style={{ height: '220px' }}
            >
              <div className='clearfix'>
                {facebookShareImage ? (
                  <div
                    className='bg-cover square'
                    style={{ backgroundImage: `url(${facebookShareImage.value})` }}
                  />
                ) : (
                  <div className='square-float'>
                    <i className='fa fa-image silver mt2 mb1' style={{ fontSize: '5em' }} />
                  </div>
                )}
                <div className={facebookShareImage ? 'hide' : null}>
                  <div className='mb1 gray'>Sua imagem deve ter 470x270 pixels</div>
                </div>
                <div className='overflow-hidden'>
                  <UploadImageField theme='classic' signingUrl={`${DefaultServerConfig.apiUrl}/uploads`} />
                </div>
              </div>
            </div>
          </FormGroup>

          <div className='col col-7'>
            <FormGroup
              {...facebookShareTitle}
              controlId='facebookShareTitle'
              style={{ paddingLeft: '0' }}
            >
              <ControlLabel className='ml1' maxLength={70}>Título do post</ControlLabel>
              <FormControl
                maxLength={70}
                placeholder='Um título direto que passe a ideia da sua mobilização'
              />
            </FormGroup>

            <FormGroup
              controlId='facebookShareDescription'
              style={{ paddingLeft: '0' }}
              {...facebookShareDescription}
            >
              <ControlLabel className='ml1' maxLength={90}>Subtítulo do post</ControlLabel>
              <FormControl
                componentClass='textarea'
                rows={7}
                maxLength={90}
                placeholder='Complete a informação do título e chame o leitor para a mobilização'
              />
            </FormGroup>
          </div>

          <div className='col col-12'>
            <div className='h5 caps bold mb2 inline'>
              <img className='align-middle' src={iconTwitter} width='32' height='32' />
              <span className='align-middle pl2 h6'>Share de Twitter</span>
            </div>
            <p className='mb2 lightgray'>
              Configure a mensagem que será publicada no Twitter
              sempre que alguém compartilhar sua mobilização.
            </p>

            <FormGroup controlId='twitterShareText' {...twitterShareText}>
              <ControlLabel maxLength={140}>Texto do Tweet</ControlLabel>
              <FormControl
                componentClass='textarea'
                rows={5}
                maxLength={140}
                placeholder='Insira uma frase e chame o leitor para a mobilização'
              />
            </FormGroup>
          </div>
        </SettingsForm>
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsSharingPage
