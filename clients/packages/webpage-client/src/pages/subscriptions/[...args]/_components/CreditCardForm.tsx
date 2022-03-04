import { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import { Button, Box, Stack, Text, FormControl, FormLabel, Input } from 'bonde-ui/src/base';

interface CreditCardFormProps {
  id: number;
  token: string;
  card?: any;
}

const required = (field: any) => {
  return field ? undefined : "não pode ficar em branco"
};

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  card
}) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://assets.pagar.me/checkout/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleSubmit = (values: any) => {
    console.log("values", values);
  }

  return (
    <Stack>
      <Box bg="gray.50">
        <Text>
        {`Altere os dados do seu cartão de crédito preenchendo os campos abaixo.
          Sua doação continuará a mesma mas, a partir do momento em que salvar os
          dados abaixo, o valor será cobrado neste novo cartão ; )`}
        </Text>
      </Box>
      {card && (
        <Box bg="gray.50">
          <Text fontWeight="bold">Dados do último cartão</Text>
          <Stack direction="row">
            <Text textTransform="uppercase">{card.brand}: </Text>
            <Text>{card.first_digits.slice(0, 4)} {card.first_digits.slice(4, 6)}XX XXXX {card.last_digits}</Text>
          </Stack>
          <Stack direction="row">
            <Text>Nome: </Text>
            <Text transform="uppercase">{card.holder_name}</Text>
          </Stack>
          <Stack direction="row">
            <Text>Validade: </Text>
            <Text>{card.expiration_date.slice(0, 2)}/{card.expiration_date.slice(2, 4)}</Text>
          </Stack>
        </Box>
      )}
      <Form onSubmit={handleSubmit}>
        {(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
            <Stack>
              <Field name="creditcard" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Número*</FormLabel>
                    <Input {...input} type='text' placeholder='0000 0000 0000 0000' />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nome *</FormLabel>
                    <Input {...input} type='text' placeholder='(igual ao que aparece no cartão)' />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="expiration" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Validade *</FormLabel>
                    <Input {...input} type='text' placeholder='00/00' />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Field name="cvv" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>CVV</FormLabel>
                    <Input {...input} type='text' placeholder='Ex: 000' />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </FormControl>
                )}
              </Field>
              <Button type="submit">Salvar</Button>
            </Stack>
          </form>
        )}
      </Form>
    </Stack>
  );
}

export default CreditCardForm;