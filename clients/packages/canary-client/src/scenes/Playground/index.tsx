import React from "react";
import {
  Container,
  JSONSchemaForm,
  Box,
  UnorderedList,
  ListItem,
  Text,
  Grid,
  GridItem
} from "bonde-components";
import { useSession, useMutation, gql } from "bonde-core-tools";
import * as schemaProps from "./schema";

const DescriptionBox = () => (
  <Box>
    <Text fontWeight="800" fontSize="md" mb={2}>Observações</Text>
    <UnorderedList>
      <ListItem>
        <Text>As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário.</Text>
      </ListItem>
      <ListItem>
        <Text>Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será assim: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.</Text>
      </ListItem>
    </UnorderedList>
  </Box>
);

const UpdateCommunityGQL = gql`
  mutation UpdateCommunity ($update_fields: communities_set_input!, $id: Int!) {
    update_communities(_set: $update_fields, where: { id: { _eq: $id } }) {
      returning {
        id
        name
        city
        description
        image
        created_at
        updated_at
        mailchimp_api_key
        mailchimp_list_id
        mailchimp_group_id
        fb_link
        twitter_link
        facebook_app_id
        email_template_from
        modules
        recipient {
          id
          pagarme_recipient_id
          transfer_day: recipient(path: "transfer_day")
          transfer_interval: recipient(path: "transfer_interval")
          transfer_enabled: recipient(path: "transfer_enabled")
          bank_account: recipient(path: "bank_account")
        }
      }
    }
  }
`;

const Playground = () => {
  const { community, onChangeAsync } = useSession();
  // const { t } = useTranslation('community');
  // const [updateRecipient] = useMutation(UpdateRecipientGQL);
    const [updateCommunity] = useMutation(UpdateCommunityGQL);
    
  const onSubmit = async ({ formData, uiSchema }: any) => {
    // Filter formData to submit only schema fields
    const update_fields = Object.keys(formData)
      .filter(key => Object.keys(uiSchema).includes(key))
      .reduce((obj: any, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});

    // TODO: change to update_by_pk
    const { data, errors } = await updateCommunity({ variables: { update_fields, id: community.id } });
    if (data) {
      return await onChangeAsync({ community: data.update_communities.returning[0] });
    }
    console.log("errors", { errors });
  }

  return community ? (
    <Container>
      <Box bg="white" p={6}>
        <Grid templateColumns="repeat(12, 1fr)" gap={12}>
          <GridItem colSpan={8}>
            <JSONSchemaForm
              {...schemaProps}
              onSubmit={onSubmit}
              formData={{
                ...community,
                recipient: {
                  ...community.recipient,
                  // Hack para usar o formulário JSON Schema da maneira correta
                  transfer: {
                    transfer_interval: community.recipient.transfer_interval,
                    transfer_day: community.recipient.transfer_day
                  }
                }
              }}
            />
          </GridItem>
          <GridItem colSpan={4}>
            <DescriptionBox />
          </GridItem>
        </Grid>
      </Box>
    </Container>
  ) : "Selecione uma comunidade";
}

export default Playground;