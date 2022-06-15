import styled from "styled-components";
import theme from "../base/theme";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100%;
  background-color: ${({ theme }) => theme.body.background.main};
  font-family: ${({ theme }) => theme.fontFamily};
`;

Main.defaultProps = {
  theme,
};

export default Main;
