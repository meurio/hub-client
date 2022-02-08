import styled from '@emotion/styled';

export const Wrap = styled.div`
  background-color: #ffffff;
  color: #222222;
  text-align: center;
  padding: 2rem;
  border-radius: 3px;
  & > p {
    margin: 1em 0;
  }
`;

export const Header = styled.h3`
  color: #000 !important;
  font-weight: bold;
  text-align: center;
  font-size: 1.25rem;
`;

export const IconWrapper = styled.div`
  padding: 1rem 0;
  color: #222222;
  text-align: center;
  margin: 0 auto;
`;

export const WrapButtons = styled.div`
  display: grid;
  grid-row-gap: 1em;
`;
