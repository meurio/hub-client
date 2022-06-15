import React, { useState, useEffect } from 'react';
import { chakra } from 'bonde-components';
import SearchInput from '../../components/SearchInput';
const { Stack, Flex } = chakra;

type RenderProps = {
  result: any[]
}

type Props = {
  header: any
  empty: any
  data: any[]
  loading?: boolean
  renderLoading?: any
  children: (props: RenderProps) => any
}

const SearchList: React.FC<Props> = ({ header, children, data, empty, loading, renderLoading }) => {
  const [datalist, setDatalist] = useState(data);
  const isLoading = typeof loading !== 'undefined' && loading && !!renderLoading;

  useEffect(() => {
    setDatalist(data)
  }, [data]);

  return (
    <Stack direction="column" spacing={4} flex={1}>
      <Flex direction={["column", "row"]} justify="space-between">
        {header}
        <SearchInput
          data={data}
          field='block.mobilization.name'
          placeholder='Buscar mobilização'
          onChange={(result: any[]) => setDatalist(result)}
        />
      </Flex>
      {isLoading ? renderLoading : datalist.length > 0
        ? children({ result: datalist })
        : empty
      }
    </Stack>
  );
}

export default SearchList;