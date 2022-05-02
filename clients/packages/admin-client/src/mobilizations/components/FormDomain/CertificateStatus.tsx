import React from 'react';
import { Heading, Text, Stack, Flex } from 'bonde-components/chakra';
import CheckIcon from "../../../icons/CheckIcon"
import LoadingIcon from "../../../icons/LoadingIcon"

interface Properties {
  customDomain?: string;
  hostedZones?: any[];
}

const CertificateStatus: React.FC<Properties> = ({ customDomain, hostedZones = [] }) => {
  const hostedZonesList = hostedZones.filter((v) => v.domain_name === customDomain?.replace('www.', ''));
  const hasCertificate = hostedZonesList[0]?.certificates[0]?.is_active === true

  return (
    <Stack mt={6}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        Status
      </Heading>

      {/* INATIVO */}
      {!customDomain && (
        <>
          <Text fontSize="sm" fontWeight="bold" >Inativo</Text>
          <Text>Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.</Text>
        </>
      )}

      {/* GERANDO CERTIFICADO  */}
      {customDomain && !hostedZonesList[0]?.certificates[0] && (
        <>
          <Flex >
            <LoadingIcon />
            <Text fontSize="sm" fontWeight="bold" ml={2} textTransform="uppercase" color="gray.400">Gerando certificado</Text>
          </Flex>
          <Text>Em poucos minutos o endereço <b>{customDomain}</b> estará disponível.</Text>
        </>
      )}

      {/* CERTIFICADO ATIVO */}
      {hasCertificate && (
        <>
          <Flex>
            <CheckIcon />
            <Text fontSize="sm" color="green.200" fontWeight="bold" textTransform="uppercase">Ativo</Text>
          </Flex>
          <Text>O endereço <b>{hostedZonesList[0]?.domain_name}</b> está ativo e com certificado de segurança.</Text>
        </>
      )}

      {/* TODO: STATUS SEM VERIFICAÇÃO DE DNS */}
    </Stack>
  );
}

export default CertificateStatus;
