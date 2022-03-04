import { extendTheme } from '@chakra-ui/react';
import * as foundations from './foundations';
import * as components from './components';

export default extendTheme({
  ...foundations,
  components,
});
