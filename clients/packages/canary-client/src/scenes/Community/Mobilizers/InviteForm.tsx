import React, { useContext } from 'react';
import {
  Button,
  ConnectedForm,
  InputField,
  SelectField,
  Validators,
  Text,
  Icon,
  Grid,
  GridItem,
  Stack,
  Flex,
  toast
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import { Context as SessionContext, useMutation, gql } from 'bonde-core-tools';

export const InviteMutation = gql`
  mutation SendInvitation ($input: InvitationInput) {
    send_invitation(input: $input) {
      user_id
      id
      role
      created_at
      updated_at
      community {
        id
        name
      }
      code
    }
  }
`;

type Values = {
  email: string
  role: number
}

type Props = {
  onSuccess: (values: any) => Promise<any> | any
  isCommunityAdmin: boolean
}

const InviteForm: React.FC<Props> = ({ onSuccess, isCommunityAdmin }) => {
  const [invite] = useMutation(InviteMutation);
  const { currentUser: user, community } = useContext(SessionContext);
  const { t } = useTranslation('community');
  const { composeValidators, required, isEmail } = Validators;

  if (community) {
    return isCommunityAdmin ? (
      <ConnectedForm
        initialValues={{ role: 2 }}
        onSubmit={async ({ email, role }: Values) => {
          const input: any = {
            community_id: community.id,
            email,
            role: Number(role),
            user_id: user.id
          };

          try {
            const { data } = await invite({ variables: { input } });

            onSuccess(data.send_invitation)
              .then(() => {
                toast(t('mobilizers.form.success'), { type: toast.TYPE.SUCCESS });
              })
          } catch ({ graphQLErrors, ...errors }) {
            if ((graphQLErrors as any).filter((err: any) => err.extensions.code === 'permission-error').length > 0) {
              toast(t('mobilizers.form.permission-denied'), { type: toast.TYPE.ERROR })
            } else {
              console.error({ graphQLErrors, ...(errors as any) })
            }
          }
        }}
      >
        {({ submitting, dirty }: any) => (
          <Grid templateColumns="repeat(2, minmax(auto, 500px)) 200px" gap={4}>
            <GridItem>
              <InputField
                name='email'
                label={t('mobilizers.form.fields.email.label')}
                placeholder={t('mobilizers.form.fields.email.placeholder')}
                validate={
                  composeValidators(
                    required(t('mobilizers.form.fields.email.errors.required')),
                    isEmail(t('mobilizers.form.fields.email.errors.isEmail'))
                  )
                }
              />
            </GridItem>
            <GridItem>
              <SelectField name='role' label={t('mobilizers.form.fields.role.label')}>
                <option value={1}>{t('mobilizers.form.fields.role.option1')}</option>
                <option value={2}>{t('mobilizers.form.fields.role.option2')}</option>
              </SelectField>
            </GridItem>
            <GridItem>
              <Flex align="center" justify="flex-start" h="100%">
                <Button type='submit' disabled={submitting || !dirty}>{t('mobilizers.form.buttons.invite')}</Button>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </ConnectedForm>
    ) : (
      <Stack direction="row" spacing={2}>
        <Icon name='InfoMsg' />
        <Text>{t('mobilizers.form.permission-info')}</Text>
      </Stack>
    );
  }

  return <h2>Community Not Found!</h2>;
};

export default InviteForm;