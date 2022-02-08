import React, { useState, useEffect } from 'react';
import { Stack, Flex } from "bonde-components";
import SearchInput from '../../components/SearchInput';

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

const SearchList = ({ header, children, data, empty, loading, renderLoading }: Props) => {
  const [datalist, setDatalist] = useState(data);
  const isLoading = typeof loading !== 'undefined' && loading && !!renderLoading;

  useEffect(() => {
    setDatalist(data)
  }, [data]);

  return (
    <Stack direction="column" spacing={4}>
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