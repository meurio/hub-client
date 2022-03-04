import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import { mode } from '@chakra-ui/theme-tools';
import { PartsStyleFunction } from '@chakra-ui/theme-tools';

const variantColor: PartsStyleFunction<typeof parts> = props => {
  const { colorScheme: c } = props;

  return {
    th: {
      color: 'gray.400',
      fontWeight: 'normal',
      borderColor: mode(`${c}.50`, `${c}.700`)(props),
    },
    td: {
      borderColor: mode(`${c}.50`, `${c}.700`)(props),
    },
  };
};

export default {
  variants: {
    simple: variantColor,
    striped: variantColor,
  },
};
