# Front-end

## 📚 Instalação e Configuração das Bibliotecas Front-End

**Criação de projeto pelo template Typescript:** `create-react-app gobarberfrontend --template=typescript`

**Instalar o React-Router-DOM:** `yarn add react-router-dom @types/react-router-dom`

**Instalar o Styled-Components:** `yarn add styled-components @types/styled-components`

**Instalar lib de cores:** `yarn add polished`

**Instalar React-Icons:** `yarn add react-icons`

**Instalar Axios**: `yarn add axios`

**Instalar lib para Formulários**: `yarn add @unform/core @unform/web`

yarn add uuidv4

yarn add react-spring

- Depois de instalar o template, todos os arquivos vamos colcoar dentro da pasta 'src'.
- Então, vamos criar uma pasta 'assets' e uma subpasta 'images'. Nela deixaremos as imagens da nossa página.

## Limpar estrutura do Template

Vamos fazer algumas alterações em arquivos do template que não vamos utilizar, ou que vamos recriar depois.

- Excluir Todos os arquivos .css
- Na pasta 'public' deixar apenas o index.html
- Excluir o Readme.md
- Excluir o App.test.tsx
- Excluir o logo.svg
- Excluir o serviceWorker.ts
- Excluir o setupTests.ts
- Abrir os arquivos 'index.tsx', App.tsx' e 'index.html' e remover as linhas que chamavam os arquivos que excluímos

# Formulário de Signup

Com a bilbioteca unform, precisamos fazer o registro dos inputs. Isso significa que preciso informar quais campos do formulário vai monitorar, para trazer o valor quando der submit.
