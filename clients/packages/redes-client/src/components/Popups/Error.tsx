import React from "react";
import {
  Stack,
  Box,
  Text,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "bonde-components";
import { Individual } from "../../types";

export default function Error({
  match,
  onSubmit,
  errorMsg,
}: {
  match: {
    recipient: Individual;
    volunteer: Omit<Individual, 'userStatus' | 'ticketId' | 'externalId'>;
  };
  onSubmit: () => void;
  errorMsg: string;
}): React.ReactElement {
  return (
    <ModalContent>
      <ModalHeader>Ops!</ModalHeader>
      <ModalBody>
        <Stack spacing={4}>
          <Text>
            Encontramos um erro e {match.recipient.firstName} não pôde ser
            encaminhada para {match.volunteer.firstName}
          </Text>
          <Box bg="gray.50" p={4}>
            <Text>{errorMsg}</Text>
          </Box>
          <Text>
            Clique abaixo para tentar outra vez. Se o erro persistir, comunique a
            equipe de tecnologia.
          </Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onSubmit}>tentar novamente</Button>
      </ModalFooter>
    </ModalContent>
  );
}
