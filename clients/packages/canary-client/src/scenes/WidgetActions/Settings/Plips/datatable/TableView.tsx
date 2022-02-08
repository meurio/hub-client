import React from 'react';
import {
  FormControl,
  FormLabel,
  Button,
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
  Heading,
  // Select
} from 'bonde-components';
import Select from "../components/ChakraReactSelect";
import { checkStatus } from './utils';
import { useQueryFilters } from './useQueryFilters';

const Row: React.FC<any> = ({ data }) => (
  <Tr>
    <Td>{data.name}</Td>
    <Td>{data.email}</Td>
    <Td>{data.whatsapp}</Td>
    <Td>{data.state}</Td>
    <Td>{data.expected_signatures || 0}</Td>
    <Td>{new Date(data.created_at).toLocaleDateString()}</Td>
    <Td>
      {checkStatus(data)}
    </Td>
  </Tr>
)

const PlipsFormTable: React.FC<{ widgetId: number }> = ({ widgetId }) => {
  const {
    data,
    total,
    loading,
    pageIndex,
    pages,
    onNextPage,
    onPreviousPage,
    onChangeStatus,
    onChangeStates,
    onChangeLimit
  } = useQueryFilters(widgetId);

  return (
    <Stack spacing={4}>
      <Flex direction='row' justify="space-between" align='end'>
        <Heading
          as="h5"
          size="xs"
          fontWeight="normal"
          color="gray.400"
          textTransform="uppercase"
        >
          Todas as fichas ({total})
        </Heading>
        <Stack direction='row' spacing={4} minW='600px'>
          <FormControl>
            <FormLabel>Estado</FormLabel>
            <Select
              isMulti
              size='sm'
              options={[
                { value: 'ES', label: 'Espirito Santo' },
                { value: 'SP', label: 'São Paulo' },
                { value: 'PE', label: 'Pernambuco' },
              ]}
              onChange={(items: any) => {
                onChangeStates(items?.map((i: any) => i.value) || []);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              size='sm'
              onChange={(item: any) => {
                onChangeStatus(item.value)
              }}
              options={[
                { value: 'todos', label: 'Todos' },
                { value: 'pendentes', label: 'Pendentes' },
                { value: 'concluidos', label: 'Concluídos' },
                { value: 'inscritos', label: 'Inscritos' },
              ]}
            />
          </FormControl>
        </Stack>
      </Flex>
      <Table variant="simple" bg="white">
        <TableCaption>
          <Stack direction="row" align='center' justify="center">
            <Button variant='ghost' onClick={onPreviousPage} disabled={pageIndex === 0}>Anterior</Button>
            <Flex w='150px'>
              <FormControl>
                <Select
                  size='sm'
                  options={[
                    { value: 10, label: '10'},
                    { value: 20, label: '20'},
                    { value: 30, label: '30'},
                  ]}
                  onChange={(item: any) => onChangeLimit(item.value)}
                />
              </FormControl>
            </Flex>
            <Button variant='ghost' onClick={onNextPage} disabled={pageIndex === pages}>Próxima</Button>
          </Stack>
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

export default PlipsFormTable;