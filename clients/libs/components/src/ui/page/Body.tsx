import styled from "styled-components";
import theme from "../base/theme";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 ${({ theme }) => theme.body.padding}px;
  overflow: hidden;
  /* background-color: ${(props) => props.theme.body}; */
`;

Body.defaultProps = {
  theme,
};

export default Body;
