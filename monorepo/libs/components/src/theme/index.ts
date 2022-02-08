import { extendTheme } from "@chakra-ui/react";
import * as foundations from "./foundations";
import * as components from "./components";

export const customTheme: any = extendTheme({
  ...foundations,
  components
});

export { default as FontsLoader } from "./FontsLoader";