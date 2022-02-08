import React from 'react';
import Dropdown from './Dropdown';
import MenuItem from './MenuItem';

interface MenuProps {
  blocks: any[];
  linkTo: Function;
}

const Menu: React.FC<MenuProps> = ({ blocks, linkTo }) => {
  const items = blocks.map((b: any) => (
    <MenuItem key={b.id} anchor={linkTo(b)} hidden={b.menu_hidden}>
      <p>{b.name || `Block ${b.position}`}</p>
    </MenuItem>
  ));

  return (
    <>
      <div className="hide-mobile menu bg-darken-4">{items}</div>
      <Dropdown className="show-mobile" icon="bars">
        {items}
      </Dropdown>
    </>
  );
};

export default Menu;
