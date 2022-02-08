import React from 'react';
import { Entity } from 'draft-js';

type Props = {
  children: React.ReactChildren;
  entityKey: string;
};
const Link = ({ children, entityKey }: Props) => {
  const { href, target } = Entity.get(entityKey).getData();
  return (
    <a href={href} target={target}>
      {children}
    </a>
  );
};

export default Link;
