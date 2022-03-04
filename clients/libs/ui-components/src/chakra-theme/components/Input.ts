import { SystemStyleObject } from '@chakra-ui/theme-tools';

type Props = {
  colorScheme: 'pink' | any;
};

export default {
  variants: {
    flushed: ({ colorScheme }: Props): any => ({
      field: {
        fontSize: '16px',
        py: 1,
        color: 'black',
        borderBottomWidth: '1px',
        borderBottomColor: 'gray.200',
        _placeholder: {
          color: 'gray.400',
        },
        _hover: {
          borderColor: `${colorScheme}.200`,
        },
        _focus: {
          outline: 'none',
          borderColor: `${colorScheme}.200`,
          boxShadow: 'none',
        },
        _disabled: {
          borderColor: 'gray.200',
          bg: 'transparent',
          color: 'gray.50',
          _placeholder: {
            color: 'gray.50',
          },
        },
        _invalid: {
          borderColor: 'red.100',
        },
      },
    }),
    outline: ({ colorScheme }: SystemStyleObject): SystemStyleObject => ({
      field: {
        bg: 'white',
        borderColor: 'gray.200',
        _hover: {
          borderColor: `${colorScheme}.200`,
        },
        _focus: {
          outline: 'none',
          borderColor: `${colorScheme}.200`,
          boxShadow: 'none',
        },
        _disabled: {
          borderColor: 'gray.200',
          color: 'gray.50',
          _placeholder: {
            color: 'gray.50',
          },
        },
        _invalid: {
          borderColor: 'red.100',
        },
      },
    }),
  },
  defaultProps: {
    size: 'sm',
    variant: 'flushed',
    colorScheme: 'pink',
  },
};
