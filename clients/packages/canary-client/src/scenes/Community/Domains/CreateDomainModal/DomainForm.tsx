import React from 'react';
import styled from 'styled-components';
import {
  Text,
  Button,
  Link,
  ConnectedForm,
  InputField,
  Hint,
  Validators,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Stack
} from 'bonde-components';
import { FormLabel } from 'bonde-components';

const RichText = styled(Text)`
  a {
    color: #ee0099;

    &:hover {
      color: #e2058a;
    }
  }
`

type Props = {
  onClose: any
  onSubmit: any
}

const { composeValidators, required } = Validators;

//eslint-disable-next-line
const isDomain = (value: any) => /[\w][^A-Zç!'(?=*[}{,^?~=+\_\/*+\|]+\.[^A-Z][\w]{1,}(\.[\w]{1,})?/g.test(value) ? undefined : ' X ';

const DomainForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  return (
    <ConnectedForm onSubmit={onSubmit}>
      {({ submiting, dirty, submitError }: any) => (
        <ModalContent>
          <ModalHeader>Adicionar domínio</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <RichText>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, <a href="https://www.faq.bonde.org/#block-7283" title="FAQ Dominios" target="_blank" rel="noopener noreferrer">clique aqui</a> pra saber mais.</RichText>
              <Stack spacing={2}>
                <Text><b>Já tem um domínio?</b> Então adicione ele aqui:</Text>
                <Text><b>Obs:</b> Não é permitido letras maiúsculas e caracteres especiais!</Text>
              </Stack>
              <Stack spacing={2}>
                <Stack bg="gray.50" direction="row" align="end" p={2} spacing={1}>
                  <FormLabel py={1} size="md" textTransform="normal">https://www.</FormLabel>
                  <InputField
                    variant="outline"
                    name='value'
                    type='text'
                    validate={composeValidators(
                      required('Preencha o domínio'),
                      isDomain
                    )}
                  />
                </Stack>
                {submitError && (
                  <Hint color='error'>{submitError}</Hint>
                )}
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Link style={{ cursor: 'pointer' }} onClick={onClose}>Cancelar</Link>
            <Button disabled={submiting || !dirty} type='submit'>Continuar</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </ConnectedForm>
  );
}

export default DomainForm;