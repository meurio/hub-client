import React from 'react';
import { chakra, form } from 'bonde-components';
import { useLazyQuery, gql } from 'bonde-core-tools';
const {
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText
} = chakra;
const { Field } =form;
const FinalForm = form.Form;

const SEARCH_SUBSCRIPTIONS_QUERY = gql`
  query ($filters: [activists_bool_exp!]) {
    subscriptions(
      where: {
        activist: {
          _or: $filters
        },
        payment_method: { _eq: "credit_card" }
      }
    ) {
      id
      token
      created_at
      email: customer_data(path: "email")
      activist {
        name
        email
      }

      widget {
        block {
          mobilization {
            name
          }
        }
      }
    }
  }
`;


const SubscriptionsList = () => {
  const [searchSubscriptions, { called, loading, data }] = useLazyQuery(SEARCH_SUBSCRIPTIONS_QUERY);

  const handleSubmit = ({ name, email }) => {
    const filters: any = {};
    if (name) {
      filters.name = { _ilike: `%${name}%` };
    }
    if (email) {
      filters.email = { _eq: email };
    }
    return searchSubscriptions({ variables: { filters }});
  }

  return (
    <Stack>
      <Stack>
        <FinalForm onSubmit={handleSubmit}>
          {(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field name="name">
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Nome do ativista</FormLabel>
                    <Input {...input} type='text' />
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ input, meta }) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input {...input} type='text' />
                    {(meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched && <FormHelperText color="red.200">{meta.error || meta.submitError}</FormHelperText>}
                  </FormControl>
                )}
              </Field>
              <Button type="submit">Buscar</Button>
            </form>
          )}
        </FinalForm>
      </Stack>
      <Box>{called && loading ? 'Buscando informações' : JSON.stringify(data)}</Box>
    </Stack>
  )
}

export default SubscriptionsList;