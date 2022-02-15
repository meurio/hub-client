import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Raise } from '../components';

describe('Form Raise', function() {
  const message = 'Nome não pode ficar em branco';

  it('should render raise', () => {
    const { getByText } = render(<Raise message={message} />);
    const error = getByText(/nome/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(message);
  });
});
