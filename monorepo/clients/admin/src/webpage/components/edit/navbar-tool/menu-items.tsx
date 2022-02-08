import classnames from 'classnames'
import { DropdownMenu } from '../dropdown-menu';
// import type { INavbarEditionWrapper } from "../navbar";
import { NavbarEditionWrapper } from '../navbar';

// interface MenuItemsProperties extends Pick<INavbarEditionWrapper, 'block'> {
//   mobile: boolean;
//   blocks: any[]
// }

const MenuItems = ({
  blocks,
  mobile,
  ...props
}: any): React.ReactElement => {
  const items = blocks.map(block => (
    <div key={block.id} className={classnames({ 'menu-item inline-block': !mobile })}>
      <NavbarEditionWrapper
        {...props}
        key={`navbar-edition-wrapper-${block.id}`}
        className='btn btn-transparent block white p2'
        block={block}
      />
    </div>
  ))

  return !mobile ? (
    <div className='lg-show center'>
      <div className='bg-darken-4'>
        {items}
      </div>
    </div>
  ) : (
    <div className='lg-hide'>
      <DropdownMenu
        wrapperClassName='absolute right-0 top-0 m1'
        buttonClassName='btn bg-darken-4 white rounded'
        menuClassName='rounded bg-darken-4 white top-0 right-0'
        menuStyle={{ marginTop: '40px' }}
        icon='bars'
      >
        {items}
      </DropdownMenu>
    </div>
  )
}

export default MenuItems
