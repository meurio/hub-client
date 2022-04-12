import React from 'react'
import { Header } from 'bonde-components'
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Table, { Styles } from './Table';
import Role from './Role';
import Resend from './Resend';
import Reseted from './Reseted';
import 'moment/locale/pt-br';

export type Row = {
  original: any
}

export type RowProps = {
  row: Row
}

const Expired = (refetch: any) => ({ row: { original: data } }: RowProps) => {
  const relative = moment(data.expires)
    .locale('pt-br')
    .endOf('day')
    .fromNow();

  if (relative.indexOf('há') > -1) return <Resend data={data} refetch={refetch} />;

  return relative;
};

const Timestamp = ({ row: { original } }: RowProps) => {
  return moment(original.created_at)
    .locale('pt-br')
    .format('DD/MM/YYYY');
};

type Props = {
  data: any[]
  refetch: any
}

function App({ data: defaultData, refetch }: Props) {
  const { t } = useTranslation('community');
  // { "user_id": 152, "created_at": "2020-01-08T12:17:44.304143", "role": 2, "email": "diego@dorgam.com.br", "expired": true, "expires": "2020-01-11T00:00:00", "__typename": "invitations" }
  const columns = React.useMemo(
    () => [
      {
        Header: <Header.H5>{t('mobilizers.table.columns.email.header')}</Header.H5>,
        accessor: 'email',
        minWidth: 350
      },
      {
        Header: <Header.H5>{t('mobilizers.table.columns.role.header')}</Header.H5>,
        accessor: 'role',
        Cell: Role
      },
      {
        Header: <Header.H5>{t('mobilizers.table.columns.user.header')}</Header.H5>,
        accessor: 'user.email',
        minWidth: 350
      },
      {
        Header: <Header.H5>{t('mobilizers.table.columns.created_at.header')}</Header.H5>,
        accessor: 'created_at',
        Cell: Timestamp
      },
      {
        Header: <Header.H5>{t('mobilizers.table.columns.expires.header')}</Header.H5>,
        accessor: 'expires',
        Cell: Expired(refetch)
      },
      {
        Header: <Header.H5>Ações</Header.H5>,
        accessor: 'user.reset_password_token',
        Cell: Reseted(t)
      }
    ],
    [refetch, t]
  );

  return (
    <Styles height="500px">
      <Table columns={columns} data={defaultData} />
    </Styles>
  );
}

export default App;
