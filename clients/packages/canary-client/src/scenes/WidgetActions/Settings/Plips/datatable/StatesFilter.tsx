import React from 'react';
import { chakra } from 'bonde-components';
import Select from "../components/ChakraReactSelect";
const { FormControl } = chakra;

const STATES = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AM", label: "AM" },
  { value: "AP", label: "AP" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MG", label: "MG" },
  { value: "MS", label: "MS" },
  { value: "MT", label: "MT" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "PR", label: "PR" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "RS", label: "RS" },
  { value: "SC", label: "SC" },
  { value: "SE", label: "SE" },
  { value: "SP", label: "SP" },
  { value: "TO", label: "TO" }
]

interface Props {
  onChange: (states: string[]) => void
}

const StatesFilter: React.FC<Props> = ({ onChange }) => {
  return (
    <FormControl minW="130px">
      <Select
        isMulti
        size='sm'
        variant="outline"
        placeholder="Estado"
        options={STATES}
        onChange={(items: any) => {
          onChange(items?.map((i: any) => i.value) || []);
        }}
      />
    </FormControl>
  );
}

export default StatesFilter;