// solid
// outline / dark mode e light mode
// ghost
// link
import { mode } from '@chakra-ui/theme-tools';
import {
  SystemStyleFunction,
  StyleFunctionProps,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const disabled = {
  solid: {
    bg: 'gray.100',
    color: 'white',
  },
  outline: {
    color: 'gray.100',
    borderColor: 'gray.100',
    bg: 'transparent',
  },
  link: {
    color: 'gray.100',
  },
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    px: 8,
  },
  md: {
    px: 6,
  },
  sm: {
    px: 4,
  },
  sx: {
    px: 3,
  },
};

const variantOutline: SystemStyleFunction = props => {
  const { colorScheme: c } = props;
  const defaultStyleProps = {
    bg: 'transparent',
    borderRadius: '50px',
    _focus: {
      boxShadow: 'none',
    },
    _disabled: {
      color: 'gray.100',
      borderColor: 'gray.100',
      bg: 'transparent',
    },
  };

  // Gray works with dark / light mode.
  if (c === 'gray') {
    return {
      ...defaultStyleProps,
      color: mode('black', 'white')(props),
      borderColor: mode('black', 'white')(props),
      _hover: {
        color: mode('gray.400', 'gray.300')(props),
        borderColor: mode('gray.400', 'gray.300')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled,
      },
      _active: {
        color: mode('gray.300', 'gray.400')(props),
        borderColor: mode('gray.300', 'gray.400')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled,
      },
    };
  }
  // Theme for all colors.
  return {
    ...defaultStyleProps,
    color: `${c}.400`,
    borderColor: `${c}.400`,
    _hover: {
      color: `${c}.300`,
      borderColor: `${c}.300`,
      bg: 'transparent',
      _disabled: defaultStyleProps._disabled,
    },
    _active: {
      color: `${c}.200`,
      borderColor: `${c}.200`,
      bg: 'transparent',
      _disabled: defaultStyleProps._disabled,
    },
  };
};

const variantGhost: SystemStyleFunction = props => {
  const { colorScheme: c } = props;
  const defaultStyleProps = {
    bg: 'transparent',
    borderColor: 'transparent',
    _focus: {
      boxShadow: 'none',
    },
    _disabled: {
      color: 'gray.100',
    },
  };

  if (c === 'gray') {
    return {
      ...defaultStyleProps,
      color: mode('black', 'white')(props),
      borderColor: mode('black', 'white')(props),
      _hover: {
        color: mode('gray.400', 'gray.300')(props),
        borderColor: mode('gray.400', 'gray.300')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled,
      },
      _active: {
        color: mode('gray.300', 'gray.400')(props),
        borderColor: mode('gray.300', 'gray.400')(props),
        bg: 'transparent',
        _disabled: defaultStyleProps._disabled,
      },
    };
  }

  if (c === 'pink') {
    return {
      ...defaultStyleProps,
      color: 'pink.200',
      _hover: {
        bg: 'transparent',
        color: 'pink.300',
      },
      _active: {
        bg: 'transparent',
      },
    };
  }

  return {
    ...defaultStyleProps,
    color: `${c}.400`,
    _hover: {
      color: `${c}.300`,
      borderColor: 'transparent',
      bg: 'transparent',
      textDecoration: 'none',
      _disabled: defaultStyleProps._disabled,
    },
    _active: {
      color: `${c}.200`,
      borderColor: 'transparent',
      bg: 'transparent',
      textDecoration: 'none',

      _disabled: defaultStyleProps._disabled,
    },
  };
};

const variantSolid: SystemStyleFunction = ({ colorScheme: c }): any => {
  const _disabled = {
    bg: 'gray.100',
    color: 'white',
  };

  return {
    bg: `${c}.200`,
    borderRadius: '50px',
    color: 'white',
    _hover: {
      bg: `${c}.300`,
      _disabled,
    },
    _active: {
      bg: `${c}.400`,
      _disabled,
    },
    _focus: {
      boxShadow: 'none',
      _disabled,
    },
    _disabled,
  };
};

export default {
  baseStyle: {
    fontWeight: '800',
    textTransform: 'uppercase',
    borderRadius: 0,
  },
  sizes,
  variants: {
    outline: variantOutline,
    ghost: variantGhost,
    solid: variantSolid,
    tag: ({ colorScheme }: StyleFunctionProps): any => ({
      bg: `${colorScheme}.100`,
      borderColor: 'trasparent',
      color: `black`,
      borderRadius: '4px',
      textTransform: 'normal',
      minW: 'auto',
      _hover: 'none',
      _active: 'none',
      _focus: 'none',
    }),
    dropdown: ({ color }: StyleFunctionProps): any => ({
      bg: 'transparet',
      borderColor: 'trasparent',
      color,
      minW: 'auto',
      _hover: {
        color,
      },
      _active: {
        color,
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    tableLink: ({ colorScheme }: StyleFunctionProps): any => ({
      bg: 'transparent',
      borderColor: 'transparent',
      color: `black`,
      minW: 'auto',
      _hover: {
        color: `${colorScheme}.400`,
        borderColor: 'transparent',
        bg: 'transparent',
        textDecoration: 'none',
        _disabled: disabled.link,
      },
      _active: {
        color: `${colorScheme}.200`,
        borderColor: 'transparent',
        bg: 'transparent',
        textDecoration: 'none',
        _disabled: disabled.link,
      },
      _focus: {
        boxShadow: 'none',
      },
      _disabled: disabled.link,
    }),
  },

  defaultProps: {
    variant: 'solid',
    colorScheme: 'pink',
    size: 'sm',
  },
};
