import React from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Text,
  Button,
  Link,
  ConnectedForm,
  InputField,
  Success,
  SelectField,
  Grid,
  GridItem,
  Validators,
  Stack,
  FormLabel,
  toast,
  useField
} from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { DNSHostedZone } from '../types';

const createRecordGQL = gql`
  mutation ($input: RecordInput) {
    create_record(input: $input)
  }
`;

type Props = {
  open: boolean
  onClose: any
  refetch: any
  dnsHostedZone: DNSHostedZone
}

const ValueRecordTypeField = (props: any) => {
  const typeField = useField('record_type');
  const placeholders: any = { A: '192.0.0.1', CNAME: 'domain.example.org' };
  return (
    <InputField
      {...props}
      placeholder={placeholders[typeField.input.value] || props.placeholder}
    />
  );
}

const TTLRecordTypeField = (props: any) => {
  const typeField = useField('record_type');
  return (
    <InputField
      {...props}
      defaultValue={typeField.input.value === 'A' ? 300 : 3600}
    />
  );
}

const NameField = ({ domainName, name, ...props }: any) => {
  return (
    <Stack direction="row" bg="gray.50" align="end" p={2} spacing={1}>
      <InputField
        {...props}
        variant="outline"
        name={name}
      />
      <FormLabel pb={4}>{`.${domainName}`}</FormLabel>
    </Stack>
  );
}

const { required } = Validators;

const RecordModal: React.FC<Props> = ({ dnsHostedZone, open, onClose, refetch }) => {
  const [createRecord] = useMutation(createRecordGQL);

  return (
    <Modal size="lg" isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ConnectedForm
        initialValues={{
          record_type: 'A',
          community_id: dnsHostedZone.community.id,
          dns_hosted_zone_id: dnsHostedZone.id,
          hosted_zone_id: dnsHostedZone.hosted_zone.Id || dnsHostedZone.hosted_zone.id
        }}
        onSubmit={async ({ ttl, value, record_type, name, ...values }: any) => {
          try {
            const variables = {
              input: {
                ...values,
                name: `${name}.${dnsHostedZone.domain_name}`,
                record_type,
                value: record_type !== 'MX' ? value : value.split(/\. /).map((v: string) => `${v.replace(/\.$/, '')}.`),
                ttl: Number(ttl)
              }
            }
            await createRecord({ variables });
            toast(<Success message='Registro adicionado com success' />, { type: toast.TYPE.SUCCESS });
            onClose();
            refetch();
          } catch (err) {
            toast(err, { type: toast.TYPE.ERROR });
          }
        }}
      >
        {({ submitting }: any) => (
          <ModalContent>
            <ModalHeader>Adicionar registro</ModalHeader>
            <ModalBody>
              <Grid templateColumns="repeat(12, 1fr)" gap={4} rowGap={4}>
                <GridItem colSpan={12}>
                  <Text>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, clique aqui pra saber mais.</Text>
                </GridItem>
                <GridItem colSpan={12}>
                  <NameField
                    name='name'
                    type='text'
                    label='Nome'
                    domainName={dnsHostedZone.domain_name}
                    validate={required('Nome deve ser preenchido')}
                  />
                </GridItem>
                <GridItem colSpan={3}>
                  <SelectField
                    name='record_type'
                    label='Tipo'
                  >
                    <option value='A'>A</option>
                    <option value='CNAME'>CNAME</option>
                    <option value='MX'>MX</option>
                    <option value='TXT'>TXT</option>
                    <option value='AAA'>AAA</option>
                  </SelectField>
                </GridItem>
                <GridItem colSpan={6}>
                  <ValueRecordTypeField
                    name='value'
                    type='text'
                    label='Valor'
                    validate={required('Valor deve ser preenchido')}
                  />
                </GridItem>
                <GridItem colSpan={3}>
                  <TTLRecordTypeField
                    name='ttl'
                    type='number'
                    label='TTL'
                  />
                </GridItem>
              </Grid>
              </ModalBody>
              <ModalFooter justifyContent="space-between">
                <Link onClick={onClose}>Cancelar</Link>
                <Button type='submit' disabled={submitting}>Continuar</Button>
              </ModalFooter>
            </ModalContent>
          )}
        </ConnectedForm>
    </Modal>
  );
}

export default RecordModal;
