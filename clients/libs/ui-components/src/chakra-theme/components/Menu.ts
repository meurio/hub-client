import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const baseButton = {
  textTransform: 'uppercase',
};

const baseList = {
  borderRadius: 'none',
  border: 'none',
  boxShadow: 'sm',
};

const baseItem = {
  _focus: {
    bg: 'transparent',
  },
  _active: {
    bg: 'transparent',
  },
  _expanded: {
    bg: 'transparent',
  },
};

const baseGroupTitle = {
  fontWeight: 'normal',
  fontSize: 'inherit',
};

const baseStyle = ({ colorScheme }: StyleFunctionProps): any => {
  return {
    button: baseButton,
    list: baseList,
    item: {
      ...baseItem,
      _hover: {
        bg: `${colorScheme}.100`,
      },
    },
    groupTitle: baseGroupTitle,
  };
};

const link = {
  item: {
    ...baseItem,
    _hover: {
      bg: 'transparent',
      color: 'pink.200',
    },
  },
};

export default {
  baseStyle,
  variants: {
    link,
  },
  defaultProps: {
    colorScheme: 'gray',
  },
};
