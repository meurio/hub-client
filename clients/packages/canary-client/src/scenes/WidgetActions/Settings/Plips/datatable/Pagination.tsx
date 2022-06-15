import React from 'react';
import { chakra } from 'bonde-components';
import Select from "../components/ChakraReactSelect";
const {
  Button,
  Text,
  Flex,
  FormControl,
  Stack,
  createIcon
} = chakra;

const ArrowLeftIcon = createIcon({
  displayName: "ArrowRightIcon",
  viewBox: '0 0 12 18',
  d: "M3.12 6l4.196-3.993L6.258 1 2.062 4.993 1 5.996l1.058 1.015L6.258 11l1.058-1.007L3.12 6z"
})

const ArrowRightIcon = createIcon({
  displayName: "ArrowRightIcon",
  viewBox: '0 0 12 18',
  d: "M9.196 6L5 2.007 6.058 1l4.196 3.993 1.062 1.003-1.058 1.015L6.058 11 5 9.993 9.196 6z"
})

interface Props {
  loading?: boolean;
  onChangePage: (pageIndex: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  pageIndex: number;
  pages: number;
  onChangeLimit: (limit: number) => void;
}

const Pagination: React.FC<Props> = ({
  // onChangePage,
  loading,
  onChangeLimit,
  onPreviousPage,
  onNextPage,
  pageIndex,
  pages
}) => {
  return (
    <Stack direction="row" align='center' justify="center">
      <Flex w='130px'>
        <FormControl>
          <Select
            variant="outline"
            size='sm'
            placeholder="Mostrar 10"
            options={[
              { value: 10, label: 'Mostrar 10'},
              { value: 20, label: 'Mostrar 20'},
              { value: 30, label: 'Mostrar 30'},
            ]}
            onChange={(item: any) => onChangeLimit(item.value)}
          />
        </FormControl>
      </Flex>
      <Button
        variant='outline'
        colorScheme="gray"
        borderRadius={2}
        onClick={onPreviousPage}
        disabled={pageIndex === 0}
      >
        <ArrowLeftIcon />
      </Button>
      <Text fontWeight="bold">{!loading ? `${pageIndex + 1} de ${pages + 1}` : "..."}</Text>
      {/* {Array.from({ length: pages + 1 }, (_: any, key: number) => (
        <Button
          variant='outline'
          colorScheme="gray"
          borderRadius={2}
          onClick={() => onChangePage(key)}
          disabled={pageIndex === key}
        >
          {key + 1}
        </Button>
      ))} */}
      <Button
        variant='outline'
        colorScheme="gray"
        borderRadius={2}
        onClick={onNextPage}
        disabled={pageIndex === pages}
      >
        <ArrowRightIcon />
      </Button>
    </Stack>
  );
}

export default Pagination;