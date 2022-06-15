import styled from "styled-components";
import theme from "../base/theme";

const Navigation = styled.div`
  display: flex;
  height: 40px;
  background-color: ${({ theme }) => theme.brand.dark};
  align-items: flex-end;

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

Navigation.defaultProps = {
  theme,
};

export default Navigation;
