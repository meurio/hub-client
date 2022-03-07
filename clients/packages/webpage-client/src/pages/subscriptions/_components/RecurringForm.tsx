import { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import InputMask from 'react-input-mask';
import { Button, Box, Stack, Text, FormControl, FormLabel, Input } from 'bonde-ui/src/base';

interface RecurringFormProps {
  id: number;
  token: string;
}

const required = (field: any) => {
  return field ? undefined : "não pode ficar em branco"
};

const RecurringForm: React.FC<RecurringFormProps> = () => {
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
        {`Preencha os campos abaixo para alterar a data em que a cobrança da sua
        doação é efetuada. Sua doação continuará a mesma mas, a partir do
        momento em que salvar os dados abaixo, o valor será cobrado neste novo
        cartão ; )`}
        </Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        {(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
            <Stack>
              <Field name="process_at" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nova data de cobrança*</FormLabel>
                    <InputMask mask="99/99/9999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='Ex: DD/MM/AAAA' />}
                    </InputMask>
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

export default RecurringForm;