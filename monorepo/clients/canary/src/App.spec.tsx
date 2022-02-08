import React from 'react';
import { shallow } from 'enzyme';
import { ChakraProvider } from "@bonde/components";
import { Route } from "react-router-dom";
import App from './App';
import Home from "./scenes/Home";
import Community from "./scenes/Community";

describe("App", () => {
  it('renders ChakraProvider', () => {
    const app = shallow(<App />);
    expect(app.find(ChakraProvider).length).toBe(1);
  });

  it('renders Route to Home scene', () => {
    const app = shallow(<App />);

    expect(app.find(Route).at(0).prop("exact")).toBe(true);
    expect(app.find(Route).at(0).prop("path")).toBe("/");
    expect(app.find(Route).at(0).prop("component")).toBe(Home);
  });

  it('renders Route to Community scene', () => {
    const app = shallow(<App />);

    expect(app.find(Route).at(1).prop("exact")).toBe(undefined);
    expect(app.find(Route).at(1).prop("path")).toBe("/community");
    expect(app.find(Route).at(1).prop("component")).toBe(Community);
  });
})

