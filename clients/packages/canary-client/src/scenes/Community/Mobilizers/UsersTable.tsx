import React from 'react';
import { Header, Button, Icon, toast } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
import Table, { Styles } from './Table';
import Role from './Role';
import DeleteException from './DeleteException';

const DeleteCommunityUsersMutation = gql`
  mutation DeleteCommunityUsers($id: Int!) {
    delete_community_users(where: { id: { _eq: $id } }) {
      returning {
        id
        user {
          first_name
        }
      }
    }
  }
`;

type Row = {
  original: any
}

type DeleteProps = {
  row: Row
  refetch: any
}

const Delete = ({ row: { original: { id, user } }, refetch }: DeleteProps) => {
  const [deleteCommunityUsers] = useMutation(DeleteCommunityUsersMutation);
  const { t } = useTranslation('community');

  return (
    <Button
      leftIcon={<Icon name='Trash' size='small' />}
      variant="tableLink"
      colorScheme="gray"
      onClick={async () => {
        try {
          const { data } = await deleteCommunityUsers({ variables: { id } })
          if (data.delete_community_users.returning.length > 0) {
            toast(t('mobilizers.table.actions.delete.success', { name: user.first_name }), { type: toast.TYPE.SUCCESS })
            return await refetch()
          }
          throw DeleteException({
            graphQLErrors: [{ extensions: { code: 'validation-failed' } }]
          })
        } catch ({ graphQLErrors, ...errors }) {
          if (graphQLErrors && graphQLErrors.filter((err: any) => err.extensions.code === 'validation-failed').length > 0) {
            toast(t('mobilizers.form.permission-denied'), { type: toast.TYPE.ERROR })
          } else {
            console.error({ graphQLErrors, ...errors })
          }
        }
      }}
    >
      Excluir
    </Button>
  );
};

const createDeleteButton = (refetch: any) => (props: any) => <Delete {...props} refetch={refetch} />;

type Props = {
  data: any[]
  refetch: any
}

function UsersTable({ data: defaultData, refetch }: Props) {
  const columns = React.useMemo(
    () => [
      {
        Header: <Header.H5>Nome</Header.H5>,
        accessor: 'user.first_name',
        minWidth: 250
      },
      {
        Header: <Header.H5>Email</Header.H5>,
        accessor: 'user.email',
        minWidth: 350
      },
      {
        Header: <Header.H5>Função</Header.H5>,
        accessor: 'role',
        width: 100,
        Cell: Role,
        minWidth: 200
      },
      {
        Header: <Header.H5>Ações</Header.H5>,
        accessor: 'id',
        minWidth: 100,
        Cell: createDeleteButton(refetch)
      }
    ],
    [refetch]
  )

  return (
    <Styles height="500px">
      <Table columns={columns} data={defaultData} />
    </Styles>
  )
}

export default UsersTable;
