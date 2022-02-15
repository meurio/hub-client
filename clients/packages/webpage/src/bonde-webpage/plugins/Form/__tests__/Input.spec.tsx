import React from 'react';
import Input from '../components/Input';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Form Input', function() {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render an input tag with type email if field kind is email', () => {
    const field = {
      kind: 'email',
      placeholder: 'inserir email',
      label: 'Email',
      required: 'true',
    };
    const { getByLabelText } = render(
      <Input
        name="test-123"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );
    const email = getByLabelText('test-123');
    expect(email).toBeInTheDocument();
  });

  it('should trigger the onBlur function one time', () => {
    const field = {
      kind: 'email',
      placeholder: 'inserir email',
      label: 'Email',
      required: 'true',
      uid: '123',
    };

    const { getByLabelText } = render(
      <Input
        name="test-456"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );
    const email = getByLabelText('test-456');
    const spy = jest.spyOn(email, 'focus');
    email.focus();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render a select input when field kind equals dropdown', () => {
    const field = {
      kind: 'dropdown',
      placeholder: 'select, um',
      label: 'Test',
      required: 'true',
    };
    const { getByLabelText } = render(
      <Input
        name="test-789"
        field={field}
        onBlur={jest.fn()}
        onChange={jest.fn()}
      />
    );

    const select = getByLabelText('test-789');
    expect(select).toBeInTheDocument();
  });
});
