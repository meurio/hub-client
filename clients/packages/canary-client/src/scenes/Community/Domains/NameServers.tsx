import React from 'react';
import {
  Text,
  Tooltip,
  InfoIcon,
  toast,
  Success,
  Icon,
  Grid,
  GridItem,
  Box,
  Stack,
  Button
} from 'bonde-components';
import copy from 'clipboard-copy';

const NameServers = ({ dnsHostedZone }: any) => {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} align="center">
        <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase">{`Registros de nome (Name servers)`}</Text>
        <Tooltip label='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.'>
          <InfoIcon color="gray.300" boxSize={3} />
        </Tooltip>
      </Stack>
      <Box bg="white" boxShadow="sm" p={4}>
        <Grid templateColumns='1fr auto' rowGap={4}>
          {dnsHostedZone.name_servers.map((ns: string) => (
            <>
              <GridItem>
                <Text>{ns}</Text>
              </GridItem>
              <GridItem>
                <Button
                  variant="link"
                  colorScheme="black"
                  onClick={() => {
                    copy(ns)
                    toast(<Success message='Name Server copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                  }}
                >
                  <Icon size='small' name='Copy' /> Copiar
                </Button>
              </GridItem>
            </>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default NameServers;