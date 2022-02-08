import React from "react";
import { shallow } from 'enzyme';
import Settings from "./Settings";
import Recipient from "./Recipient";
import Reports from "./Reports";
import Community from ".";

const Route: React.FC<{ component: any, exact: boolean, path?: string }> = ({ component: Component }) => <Component />;

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/community/reports" }),
  Route
}))

describe("Community/Recipient", () => {
  it('renders without crashing', () => {
    const scene = shallow(<Community />);
    expect(scene).toBeTruthy();
  });

  it('renders route for Community Reports scene', () => {
    const scene = shallow(<Community />);

    expect(scene.find(Route).at(0).prop("exact")).toBe(true);
    expect(scene.find(Route).at(0).prop("path")).toBe("/community/reports");
    expect(scene.find(Route).at(0).prop("component")).toBe(Reports);
  });

  it('renders route for Community Settings scene', () => {
    const scene = shallow(<Community />);

    expect(scene.find(Route).at(1).prop("exact")).toBe(true);
    expect(scene.find(Route).at(1).prop("path")).toBe("/community/settings");
    expect(scene.find(Route).at(1).prop("component")).toBe(Settings);
  });

  it('renders route for Community Recipient scene', () => {
    const scene = shallow(<Community />);

    expect(scene.find(Route).at(2).prop("exact")).toBe(true);
    expect(scene.find(Route).at(2).prop("path")).toBe("/community/recipient");
    expect(scene.find(Route).at(2).prop("component")).toBe(Recipient);
  });
});