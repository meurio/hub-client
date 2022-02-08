import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, Stack, Heading } from 'bonde-components';
import type { PlipsForm } from './performance/fetchData';

const PlipsFormTable: React.FC<{ plips: PlipsForm[], total: number }> = ({ plips, total }) => (
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
    <Table variant="simple" bg="white">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th>Estado</Th>
          <Th>Assinaturas</Th>
          <Th>Data da inscrição</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {plips.map((pf, index: number) => (
          <Tr key={`plips-form-${index}`}>
            <Td>{pf.name}</Td>
            <Td>{pf.email}</Td>
            <Td>{pf.state}</Td>
            <Td>{pf.expected_signatures || 0}</Td>
            <Td>{pf.created_at}</Td>
            <Td>{pf.confirmed_signatures !== null ? 'Entregue' : 'Pendente'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Stack>
);

export default PlipsFormTable;