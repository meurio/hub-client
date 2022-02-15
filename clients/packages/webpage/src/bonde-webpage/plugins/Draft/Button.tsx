import React from 'react';
import { StyledButton, Content } from './styles';

const Button = ({
  children,
  label,
  onClick,
}: {
  label: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  children: React.ReactNode;
}) => {
  // TODO: Renderizar icone quando coluna estiver reduzida
  return (
    <StyledButton title={label} className="col-12" onClick={onClick}>
      <Content>{children}</Content>
    </StyledButton>
  );
};

export default Button;
