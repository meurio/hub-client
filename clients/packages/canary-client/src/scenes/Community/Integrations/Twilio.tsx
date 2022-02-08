import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputField,
  Heading,
  Text,
  Button,
  Success,
  Grid,
  GridItem,
  Flex,
  Stack,
  UnorderedList,
  ListItem
} from 'bonde-components';
import CommunityForm from '../BaseForm';
import TwilioIcon from './TwilioIcon';

const TwilioPanel = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Uhuu! Twilio conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, null, null, 1]} m="0 auto">
            <TwilioIcon />
          </GridItem>
          <GridItem colSpan={[12, null, null, 7]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h3" size="xl">Twilio</Heading>
                <Text>Conecte ao Twilio para habilitar a ferramenta de pressão por telefone nas suas campanhas.</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Pra começar</Heading>
                <Text>Cadastra-se no Twilio e crie um número de telefone.</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Conectar</Heading>
                <InputField
                  name='community.twilio_account_sid'
                  label={t('integrations.form.fields.twilio_account_sid.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b>.</p>
                      <p>Logo abaixo de <b>Project Info</b> está o campo “ACCOUNT SID”.</p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                    </>
                  }
                  placeholder='Ex: ACe4________6835_______2277_______'
                />
                <InputField
                  name='community.twilio_auth_token'
                  label={t('integrations.form.fields.twilio_auth_token.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b></p>
                      <p>Logo abaixo de <b>Project Info</b> está o campo “AUTH TOKEN”.</p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                    </>
                  }
                  placeholder='Ex: ecd5_______a82c_______b9c9______'
                />
                <InputField
                  name='community.twilio_number'
                  label={t('integrations.form.fields.twilio_number.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b>.</p>
                      <p>Logo abaixo de <b>Project Info</b> está o campo “TRIAL NUMBER”.</p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                    </>
                  }
                  placeholder='Ex: +5511956781234'
                />
                <Flex justifyContent="flex-end">
                  <Button type='submit' disabled={submitting || !dirty}>Conectar ao Twilio</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem colSpan={[12, null, null, 4]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Funcionalidades</Heading>
                <UnorderedList>
                  <ListItem>
                    <Text>Habilitar a pressão por telefone nas páginas da sua comunidade.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Enviar mensagens e fazer chamadas por telefone.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Dificuldade: Fácil</Heading>
                <UnorderedList>
                  <ListItem>
                    <Text>Não precisa saber programar :)</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Ferramenta em inglês.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Ferramenta paga, com versão gratuita para testar.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      )}
    </CommunityForm>
  )
}

export default TwilioPanel;
