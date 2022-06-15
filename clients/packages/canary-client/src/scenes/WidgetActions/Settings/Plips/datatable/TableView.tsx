import React from 'react';
import { chakra } from 'bonde-components';
import EmailFilter from './EmailFilter';
import ExpectedSignaturesFilter from './ExpectedSignaturesFilter';
import ExportCSV from './ExportCSV';
import Pagination from './Pagination';
import StateFilter from './StatesFilter';
import StatusFilter from './StatusFilter';
import StatusLabel from './StatusLabel';
import QueryFiltersProvider, {
  useQueryFiltersData,
  useQueryFiltersLimit,
  useQueryFiltersPage,
  useQueryFiltersFields
} from './QueryFiltersProvider';
const {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
  Skeleton,
  Stack,
  Heading
} = chakra;

const Row: React.FC<any> = ({ data }) => (
  <Tr>
    <Td>{data.name}</Td>
    <Td>{data.email}</Td>
    <Td>{data.whatsapp}</Td>
    <Td>{data.state}</Td>
    <Td>{data.expected_signatures || 0}</Td>
    <Td>{new Date(data.created_at).toLocaleDateString()}</Td>
    <Td>
      <StatusLabel plipForm={data} />
    </Td>
  </Tr>
);

const PlipsFormTable: React.FC<any> = ({ widgetId }) => {
  const { data, total, loading } = useQueryFiltersData();
  const { pages, pageIndex, onChangePage, onNextPage, onPreviousPage } = useQueryFiltersPage();
  const { onChangeLimit } = useQueryFiltersLimit();
  const { onChangeStatus, onChangeSignatures, onChangeStates } = useQueryFiltersFields();

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Todas as fichas ({total})
      </Heading>
      <Flex direction='row' justify="space-between" align='end'>
        <Stack direction='row' spacing={4}>
          <EmailFilter />
          <ExpectedSignaturesFilter onChange={onChangeSignatures} />
          <StateFilter onChange={onChangeStates} />
          <StatusFilter onChange={onChangeStatus} />
        </Stack>
        <ExportCSV widgetId={widgetId} fileName="relatorio-plips" />
      </Flex>
      <Table variant="simple" bg="white">
        <TableCaption>
          <Pagination
            loading={loading}
            onChangePage={onChangePage}
            onChangeLimit={onChangeLimit}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            pageIndex={pageIndex}
            pages={pages}
          />
        </TableCaption>
        {loading
          ? <Skeleton width="100%" h="530px" />
          : (
          <>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Whatsapp</Th>
                <Th>Estado</Th>
                <Th>Assinaturas</Th>
                <Th>Data da inscrição</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.plips
                // eslint-disable-next-line react/display-name
                .map((pf: any) => <Row data={pf} />)}
            </Tbody>
          </>
        )}
      </Table>
    </Stack>
  );
}

const TableView: React.FC<{ widgetId: number }> = ({ widgetId }) => {
  return (
    <QueryFiltersProvider widgetId={widgetId}>
      <PlipsFormTable widgetId={widgetId} />
    </QueryFiltersProvider>
  )
};

export default TableView;