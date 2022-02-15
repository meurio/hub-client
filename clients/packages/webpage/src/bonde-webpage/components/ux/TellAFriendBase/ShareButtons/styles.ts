import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  & > a,
  button {
    margin: 0;
    padding: 2rem;
    height: auto;
    width: 100%;
    letter-spacing: 0;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 0.875rem;
    border-radius: 3px;
    font-family: inherit;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    line-height: 1.125rem;
    border: 1px solid transparent;
  }
`;
