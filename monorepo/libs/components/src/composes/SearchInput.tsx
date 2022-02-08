import React, { useRef } from 'react';
import {
  InputGroup,
  InputRightElement,
  Input,
  IconButton
} from '@chakra-ui/react';
import { SearchIcon } from '../icons';

export interface SearchInputProps {
  field: string
  data: any[]
  placeholder: string
  onChange: (data: any[]) => void
}

const getProp = (obj: any, prop: string) => {
  return prop.split('.').reduce((r, e) => {
    return r[e];
  }, obj);
};

export const SearchInput: React.FC<SearchInputProps> = ({ data, field, placeholder, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const searching = (c: any) => {
    const search = (inputRef as any).current.value;
    if (search) {

      return normalize(getProp(c, field)).indexOf(normalize(search)) !== -1;
    }
    return true;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onChange(data.filter(searching));
      }}
    >
      <InputGroup>
        <Input
          colorScheme="pink"
          ref={inputRef}
          placeholder={placeholder}
        />
        <InputRightElement
          // eslint-disable-next-line react/no-children-prop
          children={(
            <IconButton
              aria-label="Search button icon"
              variant="ghost"
              colorScheme="gray"
              type='submit'
              icon={<SearchIcon boxSize={4} />}
            />
          )}
        />
      </InputGroup>
    </form>
  );
};
