import React from 'react';
import { Heading, Text, Stack, Flex, Button, useToast } from 'bonde-components/chakra';
import CheckIcon from "../../../icons/CheckIcon"
import LoadingIcon from "../../../icons/LoadingIcon"
import { gql, useMutation, checkDNS } from 'bonde-core-tools';
import { connect } from 'react-redux';
import * as dnsControlActions from '../../../community/action-creators/dns-control';

const IP_LISTS = [
  '54.85.56.248',
  '3.236.227.166'
]

interface Certificate {
  id: number;
  domain: string;
  is_active: boolean;
  dns_hosted_zone_id: number;
}

interface HostedZone {
  id: number;
  domain_name: string;
  status: string;
  ns_ok?: boolean;
  hosted_zone?: any;
  delegation_set?: any;
  is_external_domain: boolean;
  certificates: Certificate[];
}

interface Properties {
  customDomain?: string;
  hostedZones?: HostedZone[];
  updateDomain?: (dnsHostedZone: any, mobilization?: any) => void;
}

export const CertificateStatus: React.FC<Properties> = ({ updateDomain, customDomain, hostedZones = [] }) => {
  const domain: any | undefined = hostedZones.filter(
    (v) => customDomain?.endsWith(v.domain_name)
  )[0];
  const hasCertificate = domain?.certificates[0]?.is_active
  const isExternalDomain = domain?.is_external_domain
  const failedIp = !domain?.ns_ok && isExternalDomain
  const toast = useToast()

  const [updateDnsHostedZone] = useMutation(
    gql`
      mutation ($id: Int!) {
        update_dns_hosted_zones_by_pk(
          pk_columns: { id: $id }, _set: { ns_ok: true }
        ) {
          id
          domain_name
          ns_ok
        }
      }
    `
  );

  const handleCheckDns = async () => {
    if (await checkDNS(domain.domain_name, 'A', { ip: IP_LISTS })) {
      const { data } = await updateDnsHostedZone({
        variables: {
          id: domain.id // "A" verifica por IP
        }
      })

      updateDomain && updateDomain(
        {
          ...domain,
          ...data.update_dns_hosted_zones_by_pk
        }
      );

      toast({ title: 'Tudo certo!', description: 'Ip verificado', status: 'success', duration: 4000, isClosable: true });
    } else {
      toast({ title: 'Ops, IP não verificado', description: 'Aguarde mais alguns minutos e tente novamente', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Stack mt={6}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">
        Status
      </Heading>

      {/* INATIVO */}
      {!customDomain && (
        <>
          <Text fontSize="sm" fontWeight="bold">Inativo</Text>
          <Text>Pode levar até 5 minutos para o certificado ser gerado e o endereço ficar disponível.</Text>
        </>
      )}

      {/* GERANDO CERTIFICADO  */}
      {customDomain && domain.ns_ok && !domain?.certificates[0]?.is_active && (
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
          <Text>O endereço <b>{customDomain}</b> está ativo e com certificado de segurança.</Text>
        </>
      )}

      {/* FALTOU CONFIGURAR IP */}
      {failedIp && (
        <>
          <Flex >
            <LoadingIcon />
            <Text fontSize="sm" fontWeight="bold" ml={2} textTransform="uppercase" color="gray.400">Ops, falta configurar o ip</Text>
          </Flex>
          <Text>Siga o passo a passo acima e <Button variant='link' textTransform='lowercase' onClick={handleCheckDns}
          >clique aqui
          </Button> para verificar novamente.</Text>
        </>
      )}
    </Stack>
  );
}

export default connect(undefined, { updateDomain: dnsControlActions.updateDomain })(CertificateStatus);
