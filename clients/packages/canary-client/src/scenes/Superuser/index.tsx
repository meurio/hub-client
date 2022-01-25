import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Header, Navigation, Tab } from 'bonde-components';
import { Container } from 'react-grid-system';
// import { useSession } from 'bonde-core-tools'
import CommunityForm from './CommunityForm';
// import Mobilizers from './Mobilizers'

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// const MenuItem = styled.button`
//   display: flex;
//   align-items: center;
//   text-align: left;

//   width: 205px;
//   height: 96px;
//   padding: 25px 30px;
//   margin: 0 18px 5px 0;
//   background-color: #fff;
//   text-transform: uppercase;
//   border: none;
//   outline: none;
//   box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.28);

//   svg {
//     margin-right: 15px;
//   }

//   &:active, &:focus, &:hover {
//     border: none;
//     outline: none;
//   }

//   &:hover {
//     h5 {
//       color: #a4a4a4 !important;
//     }

//     .fill {
//       path {
//         fill: #a4a4a4 !important;
//       }
//     }
//   }
// `

type Props = {
  match: any
  // history: any
}

const SuperuserPage: React.FC<Props> = ({ match }) => {
  return (
    <PageWrap>
      <SubHeader>
        {/** TODO: i18n */}
        <Header.H3>Superadmin</Header.H3>
        <Navigation>
          {/** TODO: i18n */}
          <Tab active>CRIAR COMUNIDADE</Tab>
        </Navigation>
      </SubHeader>
      <Container fluid style={{ width: "100%", padding: "30px 60px" }}>
        {/* <Row style={{ marginBottom: '20px' }}>
          <Col sm={12}>
            <Header.H5 style={{ marginBottom: '15px' }}>FUNÇÕES</Header.H5>
          </Col>
          <Col>
            <MenuItem onClick={() => history.push(`${match.url}/add`)}>
              <Icon name='Plus' />
              <span>Nova comundidade</span>
            </MenuItem>
          </Col>
        </Row> */}
        <Switch>
          <Route exact path={`${match.path}/add`}>
            <CommunityForm />
          </Route>
        </Switch>
      </Container>
    </PageWrap>
  );
};

export default SuperuserPage;