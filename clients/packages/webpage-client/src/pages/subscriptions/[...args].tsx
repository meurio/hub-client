import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text
} from 'bonde-ui/src/base';
import CreditCardForm from './_components/CreditCardForm';
import RecurringForm from './_components/RecurringForm';
import BondeIcon from './_components/BondeIcon';

interface Subscription {
  activist: any;
  amount: number;
  community: any;
  current_state: string;
  id: number;
  last_donation: any;
  next_transaction_charge_date: string;
  status: string;
  transitions: any[];
  token: string;
}

interface SubscriptionPageProps {
  subscription: Subscription;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ subscription }) => {
  const [typeForm, setTypeForm] = useState<'creditcard' | 'recurring'>();
  const card = subscription.last_donation?.gateway_data?.card;

  return (
    <Stack h="100vh" bg="gray.50" paddingX={60} paddingY={10} spacing={10}>
      <BondeIcon />
      <Box p={8} rounded={4} shadow="sm" bg="white">
        <Stack spacing={4}>
          <Heading as="h1">Dados da doação</Heading>
          <Text>Selecione abaixo quais informações da sua doação quer alterar:</Text>
          <Stack direction="row" mt={2} spacing={4}>
            <Button disabled={typeForm === 'creditcard'} onClick={() => setTypeForm('creditcard')}>Cartão de crédito</Button>
            <Button disabled={typeForm === 'recurring'}  onClick={() => setTypeForm('recurring')}>Data da doação</Button>
          </Stack>
          {typeForm === 'creditcard' ? (
            <CreditCardForm
              id={subscription.id}
              token={subscription.token}
              card={card}
            />
          ) : typeForm === 'recurring' ? (
            <RecurringForm
              id={subscription.id}
              token={subscription.token}
            />
          ) : null}
        </Stack>
      </Box>
    </Stack>
  );
}

export const getServerSideProps = async ({ params }: any): Promise<any | undefined> => {
  if (params.args) {
    // Alterar para variavel de ambiente
    const apiDomain = process.env.REACT_APP_DOMAIN_API_REST || 'http://api-rest.bonde.devel';
    const id = params.args[0];
    const token = params.args[1];

    const uri = new URL(`/subscriptions/${id}?token=${token}`, apiDomain);
    const resp = await fetch(uri.href)
    const data = await resp.json();
    
    return { props: { subscription: { ...data, token } } };
  }
}

export default SubscriptionPage;