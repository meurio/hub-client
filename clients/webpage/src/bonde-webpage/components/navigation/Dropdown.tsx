import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BarsIcon } from '../../icons';

const DropdownStyled = styled.div`
  position: relative;

  button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;

    position: absolute;
    right: 0;
    top: 0;
    margin: 1em;
  }
`;

interface WrapperStyledProps {
  open?: boolean;
}

const WrapperStyled = styled.div<WrapperStyledProps>`
  ${props => !props.open && `display: none;`}
  background-color: rgba(0,0,0,.5);
  border-radius: 3px;
  z-index: 2;
  white-space: nowrap;

  position: absolute;
  right: 0;
  top: 37px;
  margin: calc(1em - 2px);
`;

interface DropdownMenuProps {
  className?: string;
  text?: string;
  icon: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const handleOverlayClick = () => setOpen(false);

  const renderIcon = () => (!props.icon ? null : <BarsIcon />);

  const renderOverlay = () => {
    return !open ? null : (
      <div
        className="overlay fixed top-0 right-0 bottom-0 left-0 z1"
        onClick={handleOverlayClick}
      />
    );
  };

  const renderChildren = () => {
    return props.children.map((child: any, index: any) => {
      const props =
        child.type !== 'div' ? { onCloseDropdown: handleOverlayClick } : {};
      return React.cloneElement(child, {
        key: 'item-' + index,
        ...props,
      });
    });
  };

  const { text, children, className } = props;

  return (
    <DropdownStyled className={className}>
      <button type="button" onClick={handleClick}>
        {renderIcon()} {text}
      </button>
      <WrapperStyled open={open}>
        {children.length > 0 && renderChildren()}
      </WrapperStyled>
      {renderOverlay()}
    </DropdownStyled>
  );
};

export default DropdownMenu;
