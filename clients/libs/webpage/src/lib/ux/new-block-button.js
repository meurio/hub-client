import React from 'react'
// TODO: Remover dependencia dos componentes de tradução
import { FormattedMessage } from 'react-intl'


const NewBlockButton = ({ onClick }) => (
  <div id='new-block-button' className='add-new-block' onClick={onClick}>
    <i className='fa fa-plus' />
    <FormattedMessage
      id='mobrender.components--mobilization.add-block-content'
      defaultMessage='Adicionar bloco de conteúdo'
    />
  </div>
)

export default NewBlockButton