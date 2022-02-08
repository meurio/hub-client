import React from 'react'
import { FormattedMessage } from 'react-intl'
import * as paths from 'paths'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from 'components/layout'
import { Button } from 'ux/components'

if (require('exenv').canUseDOM) require('./page.scss')

const Heading = () => (
  <p className='heading'>
    <FormattedMessage
      id='page--mobilizations-launch-end.heading.all-done'
      defaultMessage='Tudo pronto?'
    />
    <br />
    <FormattedMessage
      id='page--mobilizations-launch-end.heading.just-launch'
      defaultMessage='Agora é só lançar e contar pra todo mundo!'
    />
  </p>
)

const Image = ({ image }) => (
  <div className='image' style={{ backgroundImage: `url(${image})` }} />
)

const MobilizationsLaunchPage = ({ history, mobilization: { id, facebook_share_image: image } }) => {
  return (
    <PageCentralizedLayout>
      <PageCentralizedLayoutTitle>
        <FormattedMessage
          id='page--mobilizations-launch-end.title'
          defaultMessage='Chegou a hora'
        />
      </PageCentralizedLayoutTitle>

      <div className='mobilization-launch-end'>
        <Heading />
        <Image image={image} />
        <Button onClick={() => history.push(paths.editMobilization(id))}>
          <FormattedMessage
            id='page--mobilizations-launch-end.button'
            defaultMessage='Lançar mobilização'
          />
        </Button>
      </div>
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
