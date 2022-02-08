import React, { useContext } from 'react';
import { Button, toast } from 'bonde-components';
import { Context as SessionContext, useMutation, gql } from 'bonde-core-tools';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InviteMutation } from './InviteForm';
import DeleteException from './DeleteException';

const DeleteInviteMutation = gql`
  mutation DeleteInvite($id: Int!) {
    delete_invitations(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const Styles = styled.div`
  a {
    font-weight: bold;
  }
`;

type Invite = {
  id: number
  email: string
  role: string | number
}

type Props = {
  data: Invite,
  refetch: any
}

const Resend: React.FC<Props> = ({ data: { id, email, role }, refetch }) => {
  const [deleteInvite] = useMutation(DeleteInviteMutation)
  const [createInvite] = useMutation(InviteMutation)
  const { currentUser: user, community } = useContext(SessionContext);
  const { t } = useTranslation('community');

  const onClick = async () => {
    try {
      if (!!community) {
        const { data } = await deleteInvite({ variables: { id } })

        if (data.delete_invitations.returning.length > 0) {
          const input: any = {
            community_id: community.id,
            email,
            role
          };

          if (user.isAdmin) {
            input.user_id = user.id;
          }

          await createInvite({ variables: { input } });

          await refetch();

          return toast(t('mobilizers.table.actions.resend.success'), { type: toast.TYPE.SUCCESS });
        }
        throw DeleteException({
          graphQLErrors: [{ extensions: { code: 'validation-failed' } }]
        });
      } else {
        console.log('Community Not Found!');
      }
    } catch ({ graphQLErrors, ...errors }) {
      if (graphQLErrors && (graphQLErrors as any[]).filter((err: any) => err.extensions.code === 'validation-failed').length > 0) {
        toast('mobilizers.form.permission-denied', { type: toast.TYPE.ERROR });
      } else {
        console.error({ graphQLErrors, ...(errors as any) });
      }
    }
  }

  return (
    <Styles>
      <Button href="#" onClick={onClick} colorScheme="gray" variant="tableLink">{t('mobilizers.table.actions.resend.label')}</Button>
    </Styles>
  );
};

export default Resend;
