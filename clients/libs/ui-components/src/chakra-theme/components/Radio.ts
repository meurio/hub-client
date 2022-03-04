const baseStyle = ({ colorScheme }: any) => ({
  control: {
    border: '1px solid',
    borderColor: 'gray.400',
    _checked: {
      bg: `none`,
      borderColor: `${colorScheme}.200`,
      _before: {
        w: '100%',
        h: '100%',
        bg: `${colorScheme}.200`,
        borderColor: 'white',
        border: `1px solid`,
        color: `white`,
      },
    },
    _hover: {
      borderColor: `${colorScheme}.200`,
    },
    _focus: {
      boxShadow: 'none',
    },
    _disabled: {
      borderColor: 'gray.100',
      bg: 'gray.100',
      _hover: {
        borderColor: 'gray.100',
        bg: 'gray.100',
      },
    },
  },
});

export default {
  baseStyle: baseStyle,
  defaultProps: {
    colorScheme: 'pink',
  },
};
