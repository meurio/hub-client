import React, { useContext } from 'react';
import { ConnectedForm, toast } from 'bonde-components';
import { Context as SessionContext, useMutation, gql } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

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
        signature
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

const UpdateRecipientGQL = gql`
  mutation UpInsertRecipient($input: RecipientEntityInput) {
    create_or_update_recipient(input: $input) {
      id
      community_id
      recipient {
        id
        object
        transfer_day
        transfer_enabled
        transfer_interval
        bank_account {
          id
          object
          type
          bank_code
          conta
          conta_dv
          agencia
          agencia_dv
          legal_name
          document_type
          document_number
        }
      }
    }
  }
`;

type Props = {
  children: any
  formName: 'Settings' | 'SettingsIsAdmin' | 'Recipient' | 'Mobilizers' | 'Integrations' | 'Domains'
  success: string | any
}

const BaseForm: React.FC<Props> = ({ children, formName, success }) => {
  const { community, currentUser: user, updateSession } = useContext(SessionContext);
  const { t } = useTranslation('community');
  const [updateRecipient] = useMutation(UpdateRecipientGQL);
  const [updateCommunity] = useMutation(UpdateCommunityGQL);

  const submit = async ({
    community: {
      // Remove this field
      __typename: __tc,
      id,
      recipient: {
        // Remove this field
        __typename: __tr,
        id: recipient_id,
        pagarme_recipient_id,
        bank_account: {
          // Remove this field
          charge_transfer_fees: __ctf,
          ...bank_account
        },
        ...recipient
      },
      ...update_fields
    }
  }: any) => {
    try {
      if (formName === 'Recipient') {
        // Update Recipient before to return UpdateCommunity outdate
        // Fix document_number
        const document_number = bank_account.document_number.replace(/[^0-9]/g, '');
        const bank = {
          ...bank_account,
          document_number: document_number,
          document_type: document_number.length > 11 ? 'cnpj' : 'cpf'
        }
        // Fix input values
        const input = {
          id: recipient_id,
          community_id: id,
          recipient: {
            ...recipient,
            id: pagarme_recipient_id,
            transfer_day: typeof recipient.transfer_day === 'number' ? String(recipient.transfer_day) : recipient.transfer_day,
            transfer_enabled: true,
            bank_account: bank
          }
        };
        await updateRecipient({ variables: { input }});
      }

      if (!user.isAdmin) {
        update_fields = _.omit(update_fields, ['signature', 'modules', 'image', 'name']);
      }

      // Update Community
      const { data: { update_communities: { returning } } }: any = await updateCommunity({ variables: { id, update_fields } });

      // Popup successfully
      toast(success, { type: toast.TYPE.SUCCESS });

      // Update Session
      await updateSession('community', returning[0]);
    } catch (e) {
      // invalid_permission
      if (e.message === 'invalid_permission') {
        toast(t('messages.invalid_permission'), { type: toast.TYPE.ERROR });
      } else {
        toast(e.message, { type: toast.TYPE.ERROR });
        console.error(e);
      }
    }
  }

  const initialValues = {
    community: {
      ...community,
      recipient: community?.recipient ? community?.recipient : {
        transfer_interval: 'weekly',
        transfer_day: '1',
        bank_account: {
          type: 'conta_corrente'
        }
      }
    }
  };

  return (
    <ConnectedForm initialValues={initialValues} onSubmit={submit}>
      {(props: any) => typeof children === 'function'
        ? children(props)
        : (
          <>
            {children}
          </>
        )
      }
    </ConnectedForm>
  );
}

export default BaseForm;