import React from 'react';
import { shallow } from 'enzyme';
import { IconButton, Text } from 'bonde-ui/src/base';

// Mock QRForm to pass bonde-components build
jest.mock("./QRForm", () => () => <div />)

import { SubHeader } from './QRScene';

describe("QRScene tests", () => {

  describe("SubHeader", () => {
    const goBack = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
    })

    it('should render ok', () => {
      const subheader = shallow(<SubHeader goBack={goBack} />);

      expect(subheader).toBeTruthy();
    });

    it('should be call goBack when IconButton is clicked', () => {
      const subheader = shallow(<SubHeader goBack={goBack} />);
      subheader.find(IconButton).simulate('click');

      expect(goBack.mock.calls.length).toEqual(1);
    });

    it('should render Text with custom styles', () => {
      const subheader = shallow(<SubHeader goBack={goBack} />);
      const text = subheader.find(Text);

      expect(text.props().style).toEqual({ fontSize: "13px" });
      expect(text.props().fontWeight).toEqual("900");
    })
  });
});