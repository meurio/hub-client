import React, { useState, useContext } from 'react';
import { Context as SessionContext, useMutation, gql } from 'bonde-core-tools';
import { chakra } from 'bonde-components';
import { DNSHostedZone } from '../types';
import DomainForm from './DomainForm';
import ConnectDNS from './ConnectDNS';
const { Button, Modal, ModalOverlay } = chakra;

const createDomainGQL = gql`
  mutation ($domain: DomainInput) {
    create_domain(domain: $domain) {
      comment
      community_id
      created_at
      domain_name
      id
      name_servers
      status
      ns_ok
      updated_at
    }
  }
`;

type Props = {
  btnText: string;
  refetch: any;
}

const CreateDomainModal: React.FC<Props> = ({ btnText, refetch }) => {
  const [open, setOpen] = useState(false);
  const [dnsHostedZone, setDnsHostedZone] = useState<DNSHostedZone>();
  const [createDomain] = useMutation(createDomainGQL);
  const { community, currentUser: user } = useContext(SessionContext);

  const onSubmit = async ({ value }: any) => {
    try {
      const { data } = await createDomain({
        variables: {
          domain: {
            domain_name: value,
            community_id: community?.id,
            comment: `Created by ${user.firstName}`
          }
        }
      });
      setDnsHostedZone(data.create_domain);
    } catch (err) {
      if ((err as any).message === 'domain_name_exists') {
        return { "FINAL_FORM/form-error": 'Esse domínio já existe no BONDE!' };
      }
    }
  }

  const onClose = () => {
    setOpen(false)
    setDnsHostedZone(undefined)
  }

  return (
    <>
      <Button disabled={!user.hasAdminPermission()} onClick={() => setOpen(true)}>{btnText}</Button>
      <Modal size={!dnsHostedZone ? 'lg' : '4xl'} isOpen={open} onClose={onClose}>
        <ModalOverlay />
        {!dnsHostedZone
          ? <DomainForm onClose={onClose} onSubmit={onSubmit} />
          : <ConnectDNS
            onClose={() => {
              onClose()
              refetch()
            }}
            dnsHostedZone={dnsHostedZone}
          />
        }
      </Modal>
    </>
  );
}

export default CreateDomainModal;
