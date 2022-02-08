import React from 'react';
import {
  Success,
  Button,
  Flex,
  Text,
  Stack,
  Box,
  Heading
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import AccountPanel from './AccountPanel';
import TransferPanel from './TransferPanel';
import CommunityForm from '../BaseForm';

const RecipientPage = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Recipient'
      success={<Success message='EBA! Conta bancária atualizada.' />}
    >
      {({ submitting, dirty }: any) => (
        <>
          <Stack spacing={2} mb={4}>
            <Heading as="h4" size="md">Recebimentos</Heading>
            <Text>Insira os dados da sua conta bancária para começar a receber doações pela ferramenta de crowdfunding.</Text>
          </Stack>
          <Box bg="white" boxShadow="sm" p={6}>
            <Stack spacing={4}>
              <AccountPanel />
              <TransferPanel />
            </Stack>
            <Flex direction="row" justify="flex-end">
              <Button type='submit' disabled={submitting || !dirty}>{t('buttons.submit')}</Button>
            </Flex>
          </Box>
        </>
      )}
    </CommunityForm>
  );
}

export default RecipientPage;
