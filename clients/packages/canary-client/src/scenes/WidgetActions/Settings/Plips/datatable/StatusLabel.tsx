import React from 'react';
import { chakra } from 'bonde-components';
import type { PlipForm } from './QueryFiltersProvider';
const { Tag, TagLabel } = chakra;

const StatusLabel: React.FC<{ plipForm: PlipForm }> = ({ plipForm }) => {
  if (plipForm.status === 'CONCLUIDO') {
    return (
      <Tag colorScheme="green" size="lg">
        <TagLabel>Concluído</TagLabel>
      </Tag>
    );
  } else if (plipForm.status === 'PENDENTE') {
    return (
      <Tag colorScheme="red" size="lg">
        <TagLabel>Pendente</TagLabel>
      </Tag>
    );
  }

  return (
    <Tag colorScheme="yellow" size="lg">
      <TagLabel>Inscrito</TagLabel>
    </Tag>
  );
}

export default StatusLabel;