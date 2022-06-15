import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { chakra, SettingsIcon } from 'bonde-components';
import CommunityForm from './CommunityForm';
import Donation from './Donation';
const { ButtonGroup, Button, Box, Container, Stack, Text } = chakra;

type Props = {
  match: any
}

const SuperuserPage: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  return (
    <Stack flex={1}>
      <Box bg="white" px={10} py={8}>
        <ButtonGroup spacing={6}>
          <Button
            onClick={() => history.push(`/superuser/add`)}
            variant="outline"
            colorScheme="gray"
            borderRadius={2}
            p={4}
            h='auto'
          >
            <Stack align="center">
              <SettingsIcon />
              <Text color="gray">Criar comunidade</Text>
            </Stack>
          </Button>
          <Button
            onClick={() => history.push(`/superuser/donation`)}
            variant="outline"
            colorScheme="gray"
            borderRadius={2}
            p={4}
            h='auto'
          >
            <Stack align="center">
              <SettingsIcon />
              <Text color="gray">Editar doação</Text>
            </Stack>
          </Button>
        </ButtonGroup>
      </Box>
      <Container>
        <Switch>
          <Route exact path={`${match.path}/add`}>
            <CommunityForm />
          </Route>
          <Route exact path={`${match.path}/donation`}>
            <Donation />
          </Route>
        </Switch>
      </Container>
    </Stack>
  );
};

export default SuperuserPage;