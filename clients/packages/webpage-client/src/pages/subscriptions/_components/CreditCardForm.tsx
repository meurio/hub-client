import { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import InputMask from 'react-input-mask';
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text
} from 'bonde-ui/src/base';

interface CreditCardFormProps {
  id: number;
  token: string;
  card?: any;
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const required = (field: any) => {
  return field ? undefined : "não pode ficar em branco"
};

const expirationDate = (field: any) => {
  if (field) {
    const now = new Date();
    const expiration = new Date(field.split('/').join('/01/'));
    if (now > expiration) {
      return 'data de validade do cartão inválida'
    }
  }
  return undefined;
}

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <Field
                name="creditcard"
                validate={required}
                parse={(value) => value.replaceAll(" ", "")}
              >
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Número*</FormLabel>
                    <InputMask mask="9999 9999 9999 9999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='0000 0000 0000 0000' />}
                    </InputMask>
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="name" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nome *</FormLabel>
                    <Input {...input} type='text' placeholder='(igual ao que aparece no cartão)' />
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="expiration" validate={composeValidators(required, expirationDate)}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Validade *</FormLabel>
                    <InputMask mask="99/99" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='00/00' />}
                    </InputMask>
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="cvv" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>CVV</FormLabel>
                    <InputMask mask="999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='Ex: 000' />}
                    </InputMask>
                    {meta.error && meta.touched && <FormHelperText color="red.200">{meta.error}</FormHelperText>}
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