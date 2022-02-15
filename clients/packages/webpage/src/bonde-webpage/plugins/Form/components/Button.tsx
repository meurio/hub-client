import React from 'react';
import styled from '@emotion/styled';

type Props = {
  success: boolean;
  buttonText: string;
  loading: boolean;
};

const StyledButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 1rem;
  width: 100%;
  border-radius: 3px;
  border: 1px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  line-height: 1.125rem;
  text-decoration: none;
  cursor: pointer;
`;

const WrapButton = styled.div`
  height: auto;
  margin: 1.5rem 0 1rem 0;
`;

const Button = ({ success, buttonText, loading }: Props) => (
  <WrapButton>
    <StyledButton type="submit" disabled={loading}>
      {loading ? 'Enviando...' : buttonText}
    </StyledButton>
    {success && (
      <div className="center">Sua ação foi registrada com sucesso!</div>
    )}
  </WrapButton>
);

Button.defaultProps = {
  success: false,
  loading: false,
};

export default Button;
