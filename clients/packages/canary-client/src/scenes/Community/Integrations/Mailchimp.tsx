import React from 'react';
// import { useQuery, gql } from 'bonde-core-tools';
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
  ListItem,
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import MailchimpIcon from './MailchimpIcon';
import ForceSync from './ForceSync';

const MailchimpPanel: React.FC = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Yeaa! Mailchimp conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, null, null, 1]} m="0 auto">
            <MailchimpIcon />
          </GridItem>
          <GridItem colSpan={[12, null, null, 7]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h3" size="xl">Mailchimp</Heading>
                <Text>Conecte ao Mailchimp para se comunicar com as pessoas que agirem nas mobilizações da sua comunidade.</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg" >Pra começar</Heading>
                <Text>Crie ou acesse sua conta no <a href='https://login.mailchimp.com/signup/' title='Mailchimp' target='_blank' rel="noopener noreferrer">Mailchimp</a>.</Text>
              </Stack>
              <Stack>
                <Heading as="h4" size="lg">Integrar</Heading>
                <InputField
                  name='community.mailchimp_api_key'
                  label={t('integrations.form.fields.mailchimp_api_key.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Mailchimp e <b>clique no seu nome</b> de usuário.</p>
                      <p>Você vai ver um menu surgir, clique na opção account.</p>
                      <p>Depois, siga os passos: <b>{`Extras > API keys > Your API keys > Create a Key`}</b></p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                    </>
                  }
                  placeholder={t('integrations.form.fields.mailchimp_api_key.placeholder')}
                />
                <InputField
                  name='community.mailchimp_list_id'
                  label={t('integrations.form.fields.mailchimp_list_id.label')}
                  helpText={(
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Mailchimp e <b>clique em Audience</b>.</p>
                      <p>Selecione a audiência correspondente e <b>clique em Settings</b>.</p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                    </>
                  )}
                  placeholder={t('integrations.form.fields.mailchimp_list_id.placeholder')}
                />
                <Flex justifyContent="flex-end">
                  <Button type='submit' disabled={submitting || !dirty} marginTop={4}>Conectar ao mailchimp</Button>
                </Flex>
              </Stack>
              <ForceSync />
            </Stack>
          </GridItem>
          <GridItem colSpan={[12, null, null, 4]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Funcionalidades</Heading>
                <UnorderedList>
                  <ListItem>
                    <Text>Comunicação por e-mail com todas as pessoas que agirem nas páginas da sua comunidade.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Criação automática de segmentos estáticos no Mailchimp</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Comunicação segmentada para reengajar membros da comunidade.</Text>
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
                    <Text>Ferramenta paga.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Observações</Heading>
                <Text>Os segmentos criados pelo BONDE no Mailchimp seguem esse formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)</Text>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      )}
    </CommunityForm>
  );
}

export default MailchimpPanel;
