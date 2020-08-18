import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  // função para lidar com submit, recebe como parâmetro os dados do form
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
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
        </Form>

        <a href="login">
          <FiArrowLeft /> Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
