import styled from "styled-components";
import Header from "./Header";

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  ${Header.H3} {
    color: #fff;
    margin: 0;
    height: 50px;
    display: inherit;
    align-items: center;
  }
`;

export default SubHeader;
