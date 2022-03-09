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
  Text,
  useToast
} from 'bonde-ui/src/base';
import recharge from '../../../apis/rest/recharge';

interface RecurringFormProps {
  id: number;
  token: string;
}

const required = (field: any) => {
  return field ? undefined : "não pode ficar em branco"
};

const RecurringForm: React.FC<RecurringFormProps> = ({ id, token }) => {
  const toast = useToast();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://assets.pagar.me/js/pagarme.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await recharge({ ...values, id, token });
      toast({
        title: "Data da cobrança atualizada",
        description: "Qualquer dúvida entre em contato com suporte@bonde.org",
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true
      })
    } catch (err) {
      console.log('err', err);
      return err;
    }
  }

  return (
    <Stack>
      <Box bg="gray.50" p={2} boxShadow="xs">
        <Text>
          {`Preencha abaixo a data em que gostaria que a sua próxima doação seja efetuada. O valor da doação continuará o mesmo mas, a partir do momento em que salvar os dados abaixo, a cobrança passará a ser realizada nessa nova data.`}
        </Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        {(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
            <Stack mt={4}>
              <Field name="process_at" validate={required}>
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nova data de cobrança*</FormLabel>
                    <InputMask mask="99/99/9999" {...input}>
                      {(inputProps) => <Input {...inputProps} type='text' placeholder='Ex: DD/MM/AAAA' />}
                    </InputMask>
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Button disabled={renderProps.invalid && !renderProps.dirtySinceLastSubmit} type="submit">Salvar</Button>
            </Stack>
          </form>
        )}
      </Form>
    </Stack>
  );
}

export default RecurringForm;