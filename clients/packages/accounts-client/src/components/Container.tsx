import styled from 'styled-components';
import { Link as LinkStyled } from 'bonde-components';

interface ContainerProps {
  reverse?: boolean;
  column?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > div {
    flex-grow: 1;
    margin-right: 10px;
  }
  > div:nth-child(2) {
    margin-right: 0; 
  }

  @media only screen and (max-width: 768px) {
    ${props => props.column && `
      flex-direction: column;
      
      > div {
        flex-grow: 1;
        margin: 0;
        width: 100%;
      }
    `}
    ${props => props.reverse && `flex-direction: column-reverse;`}

    ${LinkStyled}, button {
      width: 100%;
      text-align: center;
    }

    ${LinkStyled} {
      padding: 20px 0;
    }
  }
`;

Container.defaultProps = {
  column: false,
  reverse: false
};

export default Container;