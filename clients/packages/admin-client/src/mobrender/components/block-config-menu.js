import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import classnames from 'classnames'
import { DropdownMenu, DropdownMenuItem } from 'components/dropdown-menu'

export const EDIT_KEY = 'background'

const BlockConfigMenu = ({
  block,
  update,
  destroy,
  onEdit,
  canMoveUp,
  moveUp,
  canMoveDown,
  moveDown,
  display,
  intl
}) => (
  <DropdownMenu
    wrapperClassName={classnames(
      'm1 absolute bottom-0 right-0 z2',
      {'display-none': !display}
    )}
    menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
    buttonClassName='btn bg-darken-4 white rounded'
    icon='cog'
  >
    {/* TODO: Funcionalidade de 'Duplicar bloco' foi desabilitada até que a estrategia
       de desenvolvimento esteja definida. */}
    <DropdownMenuItem
      className='btn'
      onClick={() => onEdit(`${EDIT_KEY}-${block.id}`)}
    >
      <span>
        <i className='fa fa-picture-o' />{' '}
        <FormattedMessage
          id='mobrender.components--block-config-menu.item.change-background'
          defaultMessage='Alterar fundo'
        />
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={() => update({...block, hidden: !block.hidden})}
    >
      <span>
        <i className={classnames('fa', block.hidden ? 'fa-eye' : 'fa-eye-slash')} />{' '}
        {(block.hidden
          ? <FormattedMessage
            id='mobrender.components--block-config-menu.item.toggle-visibility.show'
            defaultMessage='Mostrar'
            />
          : <FormattedMessage
            id='mobrender.components--block-config-menu.item.toggle-visibility.hide'
            defaultMessage='Esconder'
            />
        )}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={() => {
        const message = intl.formatMessage({
          id: 'mobrender.components--block-config-menu.item.remove.confirm',
          defaultMessage: 'Você tem certeza que quer remover este bloco?'
        })
        if (window.confirm(message)) destroy(block)
      }}
    >
      <span>
        <i className='fa fa-trash' />{' '}
        <FormattedMessage
          id='mobrender.components--block-config-menu.item.remove'
          defaultMessage='Remover'
        />
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveUp}
      onClick={() => moveUp(block)}
    >
      <span>
        <i className='fa fa-chevron-up' />{' '}
        <FormattedMessage
          id='mobrender.components--block-config-menu.item.move-up'
          defaultMessage='Mover para cima'
        />
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveDown}
      onClick={() => moveDown(block)}
    >
      <span>
        <i className='fa fa-chevron-down' />{' '}
        <FormattedMessage
          id='mobrender.components--block-config-menu.item.move-down'
          defaultMessage='Mover para baixo'
        />
      </span>
    </DropdownMenuItem>
  </DropdownMenu>
)

BlockConfigMenu.propTypes = {
  block: PropTypes.object.isRequired,
  display: PropTypes.bool,
  // Injected by redux
  canMoveUp: PropTypes.bool,
  moveUp: PropTypes.func,
  canMoveDown: PropTypes.bool,
  moveDown: PropTypes.func,
  update: PropTypes.func,
  onEdit: PropTypes.func,
  // Injected by react-intl
  intl: intlShape.isRequired
}

export default injectIntl(BlockConfigMenu)
