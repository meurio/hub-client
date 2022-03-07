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
  
  // console.log("subscription, card", { subscription, card });
  return (
    <Container h="100vh" bg="gray.50">
      <Box p={8} rounded={4} shadow="sm" bg="white">
        <Stack>
          <Heading as="h1">Dados da doação</Heading>
          <Text>Selecione abaixo qual informações da sua doação quer alterar:</Text>
          <Stack direction="row">
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
    </Container>
  );
}

export const getServerSideProps = async ({ params }: any): Promise<any | undefined> => {
  if (params.args) {
    // Alterar para variavel de ambiente
    const apiDomain = 'https://api-rest.staging.bonde.org';
    const id = params.args[0];
    const token = params.args[1];

    const resp = await fetch(`${apiDomain}/subscriptions/${id}?token=${token}`)
    const data = await resp.json();
    
    return { props: { subscription: data } };
  }
}

export default SubscriptionPage;