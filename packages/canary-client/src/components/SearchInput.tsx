import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button, Input, Icon } from 'bonde-components';

const InputAddon = styled.div`
  position: relative;

  button {
    position: absolute;
    border: none;
    top: 12px;
    right: 0;
    padding: 0;
    justify-content: end;
    width: auto;
  }

  input {
    padding-right: 20px;
  }

  svg {
    width: calc(0.75*20px);
    height: calc(0.75*15px);
    margin-top: 3px;
  }
`;

type Props = {
  field: string,
  data: any[],
  placeholder: string,
  onChange: (data: any[]) => void
}

const getProp = (obj: any, prop: string) => {
  return prop.split('.').reduce((r, e) => {
    return r[e];
  }, obj);
};

const SearchInput = ({ data, field, placeholder, onChange }: Props) => {
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
      className='hide-xs'
      onSubmit={e => {
        e.preventDefault()
        onChange(data.filter(searching));
      }}
    >
      <InputAddon>
        <Input
          ref={inputRef}
          placeholder={placeholder}
        />
        <Button dark type='submit'><Icon name='Search' size='small' color='#c7c7c7 !important' /></Button>
      </InputAddon>
    </form>
  );
};

export default SearchInput;
