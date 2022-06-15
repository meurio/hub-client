import React from 'react';
import { chakra } from 'bonde-components';
import Select from "../components/ChakraReactSelect";
import type { FilterStatus } from './QueryFiltersProvider';
const { FormControl } = chakra;

const STATUS = [
  { value: 'todos', label: 'Status' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'concluidos', label: 'Concluídos' },
  { value: 'inscritos', label: 'Inscritos' },
]

interface Props {
  onChange: (states: FilterStatus) => void
}

const StatusFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl minW="130px">
      <Select
        size='sm'
        variant="outline"
        placeholder="Status"
        onChange={(item: any) => {
          onChange(item.value)
        }}
        options={STATUS}
      />
    </FormControl>
  );
}

export default StatusFilter;