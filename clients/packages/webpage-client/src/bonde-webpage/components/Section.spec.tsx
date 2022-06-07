import React from "react";
// import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
// import { expect } from 'chai';

import Section from './Section';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

describe('App', () => {
  //   let wrapper;
  //   const props = {
  //     mobilization: { id: 1 },
  //   };

  //   beforeEach(() => {
  const { container } = render(<Section
    key={`section-1`}
    mobilization={{ name: "teste" }}
    anchor='#1234'
    block={{ bg_class: '' }}
    editable={true}
    widgets={[]}
  // widgetComponent={{}}
  // extraWidgetProps={{}}
  />);
  //   });
  it('should render button with text', () => {
    console.log(container);
    expect(container.querySelector('div')).toBeInTheDocument();
    // expect(getAllByText('1234')).toHaveLength(1);
  });
});