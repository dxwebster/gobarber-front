import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>
        <Input name="email" icon={FiMail} placeholder="Email"></Input>

        <Input
          name="password"
          icon={FiLock} // passando um component como propriedade de outro component
          type="password"
          placeholder="Senha"
        ></Input>

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn /> Criar conta
      </a>
    </Content>

    <Background />
  </Container>
);
export default Signin;
