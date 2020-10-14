import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

// mockup de formulário
jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(<Input name="email" placeholder="Email" />);

    expect(getByPlaceholderText('Email')).toBeTruthy(); // espero que esse input exista
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="Email" />);

    const inputElement = getByPlaceholderText('Email');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement); // simula um foco no input

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;'); // espera que tenha a borda laranja
      expect(containerElement).toHaveStyle('color: #ff9000;'); // espera que tenha a cor laranja
    });

    fireEvent.blur(inputElement); // simula o desfoque no  input

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;'); // espera que NãO tenha a borda laranja
      expect(containerElement).not.toHaveStyle('color: #ff9000;'); // espera que NãO tenha a cor laranja
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="Email" />);

    const inputElement = getByPlaceholderText('Email');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' }, // simula o preenchimento do input
    });

    fireEvent.blur(inputElement); // simula o desfoque do input preenchido

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
