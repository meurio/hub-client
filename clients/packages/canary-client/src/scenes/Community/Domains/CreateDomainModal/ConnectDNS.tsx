import React, { useState } from 'react';
import { useMutation, gql } from 'bonde-core-tools';
import {
  Button,
  toast,
  Success,
  Stack,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter
} from 'bonde-components';
import { DNSHostedZone } from '../types';
import NameServersForm from './NameServersForm';
import IPConnectForm from './IPConnectForm';

const propagatingDNSGQL = gql`
  mutation ($dns_hosted_zone_id: Int!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: { status: "propagating" }
    ) {
      id
      domain_name
      community_id
      status
    }
  }
`;

type Props = {
  onClose: any;
  dnsHostedZone: DNSHostedZone
}

const ConnectDNS: React.FC<Props> = ({ dnsHostedZone, onClose }) => {
  const [status, setStatus] = useState();
  const [isNameServers, setIsNameServers] = useState(true);
  const [setPropagating] = useMutation(propagatingDNSGQL);

  const changeStatus = (e: any) => setStatus(e.target.value);
  const connectByIP = () => setIsNameServers(false);

  const done = async () => {
    await setPropagating({ variables: { dns_hosted_zone_id: dnsHostedZone.id } });
    toast(<Success message='Dominio salvo com sucesso!' />, { type: toast.TYPE.SUCCESS });
    onClose()
  }

  return (
    <ModalContent>
      {isNameServers
        ? <ModalHeader maxW="50%">Agora, precisamos da sua ajuda para conectá-lo ao BONDE</ModalHeader>
        : <ModalHeader>Conectar por IP</ModalHeader>
      }
      <ModalBody>
        {isNameServers
          ? <NameServersForm status={status} changeStatus={changeStatus} connectByIP={connectByIP} dnsHostedZone={dnsHostedZone} />
          : <IPConnectForm status={status} changeStatus={changeStatus} />
        }
      </ModalBody>
      <ModalFooter justifyContent="space-between" alignItems="center">
        <Button variant="link" colorScheme="black" onClick={onClose}>Voltar</Button>
        <Stack direction="row" spacing={4}>
          <Button variant="link" colorScheme="black" onClick={done}>Deixar para depois</Button>
          <Button onClick={done} disabled={status !== 'registered'} type='button'>Pronto!</Button>
        </Stack>
      </ModalFooter>
    </ModalContent>
  )
}

export default ConnectDNS;