import React from "react";
import {
  JSONSchemaForm,
  SimpleGrid,
  Box
} from "bonde-components";
import { useSession, useMutation, gql } from "bonde-core-tools";
import * as schemaProps from "./schema";

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

const SettingsFormPage = () => {
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

  return (
    <SimpleGrid columns={2}>
      <Box bg="white" p={6}>
        <JSONSchemaForm
          {...schemaProps}
          onSubmit={onSubmit}
          formData={{
            ...community
          }}
        />
      </Box>
    </SimpleGrid>
  );
}

export default SettingsFormPage;