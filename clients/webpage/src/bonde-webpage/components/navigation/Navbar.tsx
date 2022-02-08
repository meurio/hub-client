import React from 'react';
import styled from '@emotion/styled';
import Menu from './Menu';

const NavbarStyled = styled.div`
  position: fixed;
  width: 100%;
  z-index: 3;

  .bg-darken-4 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .center {
    text-align: center;
  }

  .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

interface NavbarProps {
  editable?: boolean;
  blocks?: any[];
  linkTo: Function;
}

const Navbar: React.FC<NavbarProps> = props => {
  const { blocks = [], editable } = props;

  const visibleMenuBlocks = !editable
    ? blocks.filter((b: any) => !b.menu_hidden)
    : blocks;
  const menuProps = { ...props, blocks: visibleMenuBlocks };

  return (
    <NavbarStyled>
      <Menu {...menuProps} />
    </NavbarStyled>
  );
};

Navbar.defaultProps = {
  editable: false,
  blocks: [],
};

export default Navbar;
