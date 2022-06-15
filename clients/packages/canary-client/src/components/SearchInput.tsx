import React, { useRef } from 'react';
import { chakra, SearchIcon } from "bonde-components";
const {
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Box
} = chakra;

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

const SearchInput: React.FC<Props> = ({ data, field, placeholder, onChange }) => {
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
    <Box w={['100%', null, '30%']}>
      <form
        style={{ width: '100%' }}
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
                aria-label="Search Button"
                variant="link"
                colorScheme="gray"
                type='submit'
                icon={<SearchIcon boxSize={4} />}
              />
            )}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
