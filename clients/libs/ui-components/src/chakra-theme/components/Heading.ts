import { SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleObject = {
  fontFamily: 'heading',
  fontWeight: 'bold',
};

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    fontSize: 'xs',
  },
  sm: {
    fontWeight: 'extrabold',
    fontSize: ['xs', null, 'sm'],
  },
  md: {
    fontWeight: 'bold',
    fontSize: ['sm', null, 'md'],
  },
  lg: {
    fontWeight: 'bold',
    fontSize: ['md', null, 'lg'],
  },
  xl: {
    fontWeight: 'black',
    fontSize: ['lg', null, 'xl'],
  },
  '2xl': {
    fontWeight: 'black',
    fontSize: ['xl', null, '2xl'],
  },
  '3xl': {
    fontWeight: 'black',
    fontSize: ['2xl', null, '3xl'],
  },
  '4xl': {
    fontWeight: 'black',
    fontSize: ['3xl', null, '4xl'],
  },
  '5xl': {
    fontWeight: 'black',
    fontSize: ['4xl', null, '5xl'],
  },
  '6xl': {
    fontWeight: 'black',
    fontSize: ['5xl', null, '6xl'],
  },
};

const defaultProps: SystemStyleObject = {
  size: '2xl',
};

export default {
  baseStyle,
  sizes,
  defaultProps,
};
