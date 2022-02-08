import React from "react";
import { Stack, Box, Button, Heading, Text } from "bonde-components";
import { useLocation, Link } from "react-router-dom";
import CheckIcon from "../../../../../Icons/CheckIcon";

interface Props {
  stepsValidation: boolean[]
}

const StepByStepCard: React.FC<Props> = ({ stepsValidation }) => {
  const location = useLocation();

  const shouldRender = stepsValidation.reduce((acc, next) => {
    if (acc === true) return acc;
    return acc || next;
  }, false);

  return shouldRender ? (
    <Stack
      direction="row"
      bg="white"
      height={60}
      spacing={[98, 98, 98, 158]}
      padding={38}
    >
      <Stack maxW={60} justifyContent="center" >
        <Heading size="4xl">
          Bora pressionar!
        </Heading>

        <Text fontSize="18px">
          Para começar, lembre-se de:
        </Text>
      </Stack>
      <Stack direction="row" spacing={4}>
        <Box maxW={60}>
          <Text fontSize="18px">
            1 - Definir os <b>alvos</b> da sua campanha (quem você quer pressionar) e o conteúdo do e-mail que será enviado para eles;
          </Text>
          <Stack direction="row" spacing={1}>
            <Button
              as={Link}
              variant="ghost"
              colorScheme="pink"
              px={0}
              to={location.pathname + "/targets"}
            >
              Definir alvos
            </Button>
            {!stepsValidation[0] && (
              <CheckIcon />
            )}
          </Stack>
        </Box>

        <Box maxW={60}>
          <Text fontSize="18px">
            2 - Ajustar o <b>formulário</b> para deixá-lo do jeitinho da sua campanha;
          </Text>
          <Stack direction="row" spacing={1}>
            <Button
              as={Link}
              variant="ghost"
              px={0}
              to={location.pathname + "/adjusts"}
            >
              Ajustar formulário
            </Button>
            {!stepsValidation[1] && (
              <CheckIcon />
            )}
          </Stack>
        </Box>

        <Box maxW={60}>
          <Text fontSize="18px">
            3 - Escrever o <b>e-mail de agradecimento</b> que vai ser enviado para quem agir na sua campanha.
          </Text>
          <Stack direction="row" spacing={1}>
            <Button
              as={Link}
              variant="ghost"
              px={0}
              to={location.pathname + "/autofire"}
            >
              Escrever e-mail
            </Button>
            {!stepsValidation[2] && (
              <CheckIcon />
            )}
          </Stack>
        </Box>
      </Stack>
    </Stack >
  ) : null;
}

export default StepByStepCard;
