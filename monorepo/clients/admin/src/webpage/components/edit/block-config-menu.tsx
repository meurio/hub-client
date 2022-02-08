import classnames from 'classnames'
import { DropdownMenu, DropdownMenuItem } from './dropdown-menu';


export const EDIT_KEY = 'background'

interface BlockConfigMenuProperties {
  block: any;
  // eslint-disable-next-line react/require-default-props
  display?: boolean;
  destroy: (block: any) => void;
  canMoveUp: boolean;
  moveUp: (block: any) => void;
  canMoveDown: boolean;
  moveDown: (block: any) => void;
  update: (block: any) => void;
  onEdit: (key: string) => void;
  // Injected by react-intl
  // intl: intlShape.isRequired
}

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
  // intl
}: BlockConfigMenuProperties): React.ReactElement => (
  <DropdownMenu
    wrapperClassName={classnames(
      'm1 absolute bottom-0 right-0 z2',
      { 'display-none': !display }
    )}
    menuClassName='bg-darken-4 rounded white right-0 top-0 mr4'
    buttonClassName='btn bg-darken-4 white rounded'
    icon='cog'
  >
    {/* TODO: Funcionalidade de 'Duplicar bloco' foi desabilitada até que a estrategia
       de desenvolvimento esteja definida. */}
    <DropdownMenuItem
      className='btn'
      onClick={(): void => onEdit(`${EDIT_KEY}-${block.id}`)}
    >
      <span>
        <i className='fa fa-picture-o' />{' '}
        Alterar fundo
        {/* <FormattedMessage
          id='mobrender.components--block-config-menu.item.change-background'
          defaultMessage='Alterar fundo'
        /> */}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={(): void => update({ ...block, hidden: !block.hidden })}
    >
      <span>
        <i className={classnames('fa', block.hidden ? 'fa-eye' : 'fa-eye-slash')} />{' '}
        {(block.hidden
          ? "Mostrar"
          // <FormattedMessage
          //   id='mobrender.components--block-config-menu.item.toggle-visibility.show'
          //   defaultMessage='Mostrar'
          // />
          : "Esconder"
          // <FormattedMessage
          //   id='mobrender.components--block-config-menu.item.toggle-visibility.hide'
          //   defaultMessage='Esconder'
          // />
        )}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      onClick={(): void => {
        const message = "Você tem certeza que quer remover este bloco?";
        // intl.formatMessage({
        //   id: 'mobrender.components--block-config-menu.item.remove.confirm',
        //   defaultMessage: 'Você tem certeza que quer remover este bloco?'
        // })
        if (window.confirm(message)) destroy(block)
      }}
    >
      <span>
        <i className='fa fa-trash' />{' '}
        Remover
        {/* <FormattedMessage
          id='mobrender.components--block-config-menu.item.remove'
          defaultMessage='Remover'
        /> */}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveUp}
      onClick={(): void => moveUp(block)}
    >
      <span>
        <i className='fa fa-chevron-up' />{' '}
        Mover para cima
        {/* <FormattedMessage
          id='mobrender.components--block-config-menu.item.move-up'
          defaultMessage='Mover para cima'
        /> */}
      </span>
    </DropdownMenuItem>
    <DropdownMenuItem
      className='btn'
      disabled={!canMoveDown}
      onClick={(): void => moveDown(block)}
    >
      <span>
        <i className='fa fa-chevron-down' />{' '}
        Mover para baixo
        {/* <FormattedMessage
          id='mobrender.components--block-config-menu.item.move-down'
          defaultMessage='Mover para baixo'
        /> */}
      </span>
    </DropdownMenuItem>
  </DropdownMenu>
);

// export default injectIntl(BlockConfigMenu)
export default BlockConfigMenu;
