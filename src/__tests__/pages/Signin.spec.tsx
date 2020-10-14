import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/Signin';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

// mockup do funcionamento da função useHistory que vem do react-router-dom
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// mockup do funcionamento de autenticação que busca dados da api
jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

// mockup de um erro quee exibe o toast
jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear(); // limpa o mockup de hostórico antes de cada teste
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // O 'fireEvent' simula uma interação do usuário com a tela
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } }); // preenchimento de email
    fireEvent.change(passwordField, { target: { value: '123456' } }); // preenchimento de senha
    fireEvent.click(buttonElement); // clique no submit

    // expera que seja redirecionado para o dashboard
    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // O 'fireEvent' simula uma interação do usuário com a tela
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } }); // preenchimento de email
    fireEvent.change(passwordField, { target: { value: '123456' } }); // preenchimento de senha
    fireEvent.click(buttonElement); // clique no submit

    // expera que seja redirecionado para o dashboard
    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled;
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error(); // dispara um erro quando tenta fazer o signin
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });
  });
});
