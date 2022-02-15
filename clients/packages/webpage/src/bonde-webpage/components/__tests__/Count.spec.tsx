import React from 'react';
import { render } from '@testing-library/react';
import Count from '../Count';
import '@testing-library/jest-dom/extend-expect';

describe('Count component', () => {
  const text = 'inscritos';
  const count = 10;
  const startCounting = true;
  it('renderCount should render the count text', () => {
    const { getByText } = render(
      <Count
        startCounting={startCounting}
        text={text}
        value={count}
        color={'#000'}
      />
    );
    expect(getByText(/[text]/i)).toBeInTheDocument();
  });

  it('renderCount should render the count number', () => {
    const { getByText } = render(
      <Count
        startCounting={startCounting}
        text={text}
        value={count}
        color={'#000'}
      />
    );
    expect(getByText(/[count]/i)).toBeInTheDocument();
  });
});
