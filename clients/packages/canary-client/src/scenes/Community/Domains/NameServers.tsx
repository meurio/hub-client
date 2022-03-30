import React from 'react';
import { toast, Icon, Success } from 'bonde-components';
import { InfoIcon } from 'bonde-components/icons';
import {
  Text,
  Tooltip,
  Grid,
  GridItem,
  Box,
  Stack,
  Button
} from 'bonde-components/chakra';
import copy from 'clipboard-copy';
import { MainTitle } from './Styles';
import { DNSHostedZone } from './types';

const NameServers: React.FC<{ dnsHostedZone: DNSHostedZone }> = ({ dnsHostedZone }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} align="center">
        <MainTitle>{`Registros de nome (Name servers)`}</MainTitle>
        <Tooltip label='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.'>
          <InfoIcon color="gray.300" boxSize={3} />
        </Tooltip>
      </Stack>
      <Box bg="white" boxShadow="sm" p={4}>
        <Grid templateColumns='1fr auto' rowGap={4}>
          {dnsHostedZone.name_servers.map((ns: string, i: number) => (
            <React.Fragment key={i}>
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
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default NameServers;
