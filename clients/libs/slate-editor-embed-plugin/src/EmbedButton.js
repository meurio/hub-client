/* eslint-disable react/prop-types */
import React from 'react'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames'
import { Button } from '@slate-editor/components'

import { appendEmbed, hasEmbed } from './EmbedUtils'

const EmbedButton = ({ value, onChange, className, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={() => {
      const embed = window.prompt('Enter the embed that you want to add.')
      if (embed) {
        onChange(appendEmbed(value.change(), embed))
      }
    }}
    className={classnames(
      'slate-embed-plugin--button',
      { active: hasEmbed(value) },
      className
    )}
  >
    <FontAwesome name="code" />
  </Button>
)

export default EmbedButton
