import React from 'react'
import { any, bool, shape, string } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FacebookShareButton from './facebook-share-button'
import TwitterShareButton from './twitter-share-button'
import WhatsAppShareButton from './whatsapp-share-button'

// import checkMarkImage from './'

const TellAFriend = ({
  preview,
  href,
  message,
  mobilization: {
    twitter_share_text: twitterShareText
  },
  imageUrl,
  imageWidth,
  widget
}) => {
  const settings = widget.settings || {}
  return (
    <div className='center p3 bg-white darkengray rounded'>
      <div className='m0 h3 bold'>{message}</div>
      <div className='py2'>
        <img src={imageUrl || './check-mark-image.png'} style={{ width: imageWidth || 100 }} alt="" />
      </div>
      <p>
        <FormattedMessage
          id={widget.settings.finish_message_type === 'donation-recurrent'
          ? 'widgets.components--donation.finish-post-donation-messages.tell-a-friend.text'
          : 'share.components--tell-a-friend.text'}
          defaultMessage='Agora, compartilhe com seus amigos!'
        />
      </p>
      <p><FacebookShareButton href={href} /></p>
      <p><TwitterShareButton href={href} text={twitterShareText} /></p>
      <p><WhatsAppShareButton whatsappText={settings.whatsapp_text || href} /></p>
    </div>
  )
}

TellAFriend.propTypes = {
  preview: bool,
  mobilization: shape({
    twitter_share_text: string
  }).isRequired,
  widget: shape({
    settings: shape({
      whatsapp_text: string
    })
  }).isRequired,
  message: any.isRequired,
  href: string.isRequired,
  imageUrl: string,
  imageWidth: string
}

export default TellAFriend

