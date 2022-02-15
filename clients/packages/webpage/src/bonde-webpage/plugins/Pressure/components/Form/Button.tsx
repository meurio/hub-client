import styled from '@emotion/styled';

const Button = styled.button`
  letter-spacing: 0px;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  border-radius: 3px;
  text-decoration: none;
  width: 100%;
  background-color: rgb(242, 51, 146);
  border-color: rgb(242, 51, 146);
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.125rem;
  height: auto;
  padding: 1rem 0px;
  display: grid;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  grid-template-columns: auto auto;
  column-gap: 5px;
  outline: none;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px;
  border: 1px solid rgb(238, 0, 153);
  background: rgb(238, 0, 153);
`;

export default Button;
