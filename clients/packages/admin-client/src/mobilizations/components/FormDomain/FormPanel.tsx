import React from 'react';
import { gql, useMutation, checkDNS } from 'bonde-core-tools';
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  useToast
} from 'bonde-components/chakra';
import CustomTab from './CustomTab';
import ExternalDomainForm from './ExternalDomainForm';
import DomainForm from './DomainForm';
import SubdomainForm from './SubdomainForm';
// TODO: rever import
import { connect } from 'react-redux';
import * as dnsControlActions from '../../../community/action-creators/dns-control';

const IP_LISTS = [
  '54.85.56.248',
  '3.236.227.166'
]

interface FormPanelProperties {
  hostedZones: any[];
  mobilization: any;
  updateDomain?: (dnsHostedZone: any, mobilization?: any) => void;
}

export const FormPanel: React.FC<FormPanelProperties> = ({
  hostedZones,
  mobilization,
  updateDomain
}) => {
  const toast = useToast();
  // Active tab by custom domain type
  let defaultIndex = 0;
  const { custom_domain: customDomain } = mobilization;
  /* eslint-disable no-useless-escape */
  const subdomainRegex = (zone) => new RegExp(`^www\..+\.${zone.domain_name}$`).test(customDomain);
  const rootDomainRegex = (zone) => new RegExp(`^www\.${zone.domain_name}$`).test(customDomain);
  /* eslint-disable no-useless-escape */
  const internalHostedZones = hostedZones.filter((dns) => !dns.is_external_domain);

  if (!customDomain || internalHostedZones.some(subdomainRegex)) defaultIndex = 0;
  else if (!!customDomain && !internalHostedZones.some(subdomainRegex) && !internalHostedZones.some(rootDomainRegex)) defaultIndex = 2;
  else if (internalHostedZones.some(rootDomainRegex)) defaultIndex = 1;

  // Submit action to update custom domain on mobilization
  const [updateMobilization] = useMutation(
    gql`
      mutation ($id: Int!, $customDomain: String!) {
        update_mobilizations_by_pk(pk_columns: { id: $id }, _set: { custom_domain: $customDomain }) {
          id
          custom_domain
        }
      }
    `
  );
  const [createDnsHostedZone] = useMutation(
    gql`
      mutation ($customDomain: String!, $comment: String!, $communityId: Int!) {
        insert_dns_hosted_zones_one(
          object: {
            domain_name: $customDomain,
            comment: $comment,
            community_id: $communityId,
            is_external_domain: true
          }
        ) {
          id
          domain_name
          ns_ok
        }
      }
    `
  );
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
  const [createOrUpdateCertificate] = useMutation(
    gql`
      mutation ($dns_hosted_zone_id: Int!) {
        create_or_update_certificate(dns_hosted_zone_id: $dns_hosted_zone_id) {
          id
          is_active
          domain
          dns_hosted_zone_id
        }
      }
    `
  );

  const onSubmit = async ({ customDomain, isExternalDomain = false }: { customDomain: string, isExternalDomain?: boolean }) => {
    try {
      const hostedZone = internalHostedZones.filter((hz) => customDomain.endsWith(hz.domain_name))[0];
      if (isExternalDomain) {
        // Create dns hosted zone
        const { data } = await createDnsHostedZone({
          variables: {
            customDomain,
            communityId: mobilization.community_id,
            comment: `mobilization_id:${mobilization.id}`
          }
        });

        // Verify IP configuration to dispatch certificate
        if (data?.insert_dns_hosted_zones_one) {
          if (await checkDNS(customDomain, 'A', { ip: IP_LISTS })) {
            await updateDnsHostedZone({
              variables: {
                id: data?.insert_dns_hosted_zones_one.id
              }
            })
          }
        }
      } else {
        if (!hostedZone?.ns_ok) {
          if (await checkDNS(customDomain, 'NS', { ns: hostedZone.name_servers })) {
            await updateDnsHostedZone({ variables: { id: hostedZone.id } })
          }
        }
      }

      const { data: { update_mobilizations_by_pk } } = await updateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });

      // update certificate is the final request because make a fetch customDomains
      let certificate;
      if (hostedZone?.ns_ok && !isExternalDomain) {
        const { data } = await createOrUpdateCertificate({ variables: { dns_hosted_zone_id: hostedZone.id } });
        certificate = data?.create_or_update_certificate;
      }

      updateDomain && updateDomain(
        {
          ...hostedZone,
          certificates: certificate ? [certificate] : []
        },
        { ...mobilization, ...update_mobilizations_by_pk }
      );
      toast({ title: 'Domínio registrado com sucesso!', status: 'success', isClosable: true });
    } catch (err: any) {
      toast({
        title: 'Falha ao atualizar o domínio',
        description: 'Esse endereço já está sendo usado em outra página.',
        status: 'error',
        isClosable: true
      });
    }
  }

  return (
    <Stack minW={[200, 400, 400, 400, 1047]} spacing={2}>
      <Heading fontWeight="semibold" fontSize="sm" textTransform="uppercase">Tipo de domínio</Heading>
      <Tabs variant="unstyled" mt={0} defaultIndex={defaultIndex}>
        <TabList ml={-4} textColor="gray.400">
          <CustomTab textTransform="uppercase">Subdomínio</CustomTab>
          <CustomTab textTransform="uppercase">Domínio Principal</CustomTab>
          <CustomTab textTransform="uppercase">Domínio Externo</CustomTab>
        </TabList>
        <TabPanels ml={-4}>
          <TabPanel>
            <SubdomainForm
              customDomain={defaultIndex === 0 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={internalHostedZones.filter((dns) => dns.ns_ok)}
            />
          </TabPanel>
          <TabPanel>
            <DomainForm
              customDomain={defaultIndex === 1 ? customDomain : null}
              onSubmit={onSubmit}
              hostedZones={internalHostedZones.filter((dns) => dns.ns_ok)}
            />
          </TabPanel>
          <TabPanel>
            <ExternalDomainForm
              customDomain={defaultIndex === 2 ? customDomain : null}
              onSubmit={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

export default connect(undefined, { updateDomain: dnsControlActions.updateDomain })(FormPanel);
