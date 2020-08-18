import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome"></Input>
        <Input name="email" icon={FiMail} placeholder="Email"></Input>

        <Input
          name="password"
          icon={FiLock} // passando um component como propriedade de outro component
          type="password"
          placeholder="Senha"
        ></Input>

        <Button type="submit">Entrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft /> Voltar para Logon
      </a>
    </Content>
  </Container>
);
export default SignUp;
