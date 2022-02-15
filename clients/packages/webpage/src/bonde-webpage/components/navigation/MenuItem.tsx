import React from 'react';
import styled from '@emotion/styled';
import { EyeSlashIcon } from '../../icons';

export const Link = styled.a`
  position: relative;
  display: block;
  color: #fff;
  padding: 1rem;

  text-decoration: none;

  font-family: inherit;
  font-size: inherit;
  font-weight: 700;

  cursor: pointer;
  margin: 0;
  height: auto;
  border: 1px solid transparent;

  vertical-align: middle;
  -webkit-appearance: none;

  line-height: 1.125rem;
`;

interface MenuItemProps {
  anchor: string;
  hidden: boolean;
  onCloseDropdown?: any;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { children, anchor, hidden, onCloseDropdown } = props;

  return (
    <Link href={`#${anchor}`} onMouseUp={onCloseDropdown}>
      <span style={{ opacity: hidden ? '.25' : '1' }}>{children}</span>
      {hidden && (
        <div className="h2 absolute top-0 bottom-0 left-0 right-0 center flex flex-center">
          <EyeSlashIcon styled="flex-auto" />
        </div>
      )}
    </Link>
  );
};

export default MenuItem;
