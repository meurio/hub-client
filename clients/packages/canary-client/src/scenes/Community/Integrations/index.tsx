import React from 'react';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
  Heading,
  Text,
  Box,
  Link as LinkStyled,
  Stack
} from 'bonde-components';
import Mailchimp from './Mailchimp';
import Twilio from './Twilio';

const MenuStyled = styled.div`
  ${LinkStyled} {
    margin-right: 15px;
    text-transform: uppercase;
    font-weight: bold;
    color: #424242;
    border: none;
    outline: none;
  }
  ${LinkStyled}.active {
    color: #EE0099;
  }
`;

const SettingsPage = () => {
  const { name }: any = useParams();
  const { path } = useRouteMatch();

  return (
    <>
      <Stack spacing={2} mb={4}>
        <Heading as="h3" size="md">Integrações</Heading>
        <Text>Conecte sua conta no BONDE a outras ferramentas para expandir seu impacto.</Text>
      </Stack>
      <Stack mb={4}>
        <MenuStyled>
          <LinkStyled component={Link} to={path.replace(':name', 'mailchimp')} className={name === 'mailchimp' ? 'active' : ''}>Comunicação</LinkStyled>
          <LinkStyled component={Link} to={path.replace(':name', 'twilio')} className={name === 'twilio' ? 'active' : ''}>Pressão</LinkStyled>
        </MenuStyled>
      </Stack>

      <Box bg="white" boxShadow="sm" p={10}>

        <Switch>
          <Route exact path={path.replace(':name', 'mailchimp')}>
            <Mailchimp />
          </Route>
          <Route exact path={path.replace(':name', 'twilio')}>
            <Twilio />
          </Route>
        </Switch>
      </Box>
    </>
  );
}

// TODO:
// - Translate
// - Validate (+phone)
// - Hint

export default SettingsPage;
