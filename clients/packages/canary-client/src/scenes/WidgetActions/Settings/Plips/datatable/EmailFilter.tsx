import React from 'react';
import { chakra } from 'bonde-components';
import { useQueryFiltersFields } from './QueryFiltersProvider';
const { FormControl, Input } = chakra;

const EmailFilter: React.FC = () => {
  const { onChangeEmail } = useQueryFiltersFields()
  return (
    <FormControl minW="200px">
      <Input
        size='sm'
        variant="outline"
        placeholder="Buscar por email"
        bg="none"
        onChange={(evt: any) => {
          if (
            String(evt?.target?.value)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          ) {
            onChangeEmail(evt.target.value);
          } else if (evt?.target?.value.length === 0) {
            onChangeEmail(undefined);
          }
        }}
      />
    </FormControl>
  );
}

export default EmailFilter;