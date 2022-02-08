import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  // Box,
  // BondeIcon,
  ChakraProvider,
  // Container,
  CSSReset,
  FontsLoader,
  // Flex,
  customTheme
} from "@bonde/components";
import Home from "./scenes/Home";
import Community from "./scenes/Community";

const App: React.FC = () => {

  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <FontsLoader />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/community" component={Community} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
