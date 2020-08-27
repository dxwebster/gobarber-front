<h1 align=center> GoBarber</h1>

<p align=center> Aplicação que permite agendamentos de dia/horário no cabeleireiro.</p>

💻 **Acesse a aplicação [aqui](https://gobarber-appp.herokuapp.com/)**

<p align=center>
<img src="readme/Capa.png" width=600><br>

<h6 align=center>🎨 Design por [Tiago Luchtenberg](https://www.instagram.com/tiagoluchtenberg/) </h6>

<br><br>

</p>

---

## 📥 Executar esse projeto no seu computador

- Clonar Repositório: `git clone https://github.com/dxwebster/GoBarber-Frontend.git`
- Ir para a pasta: `cd GoBarber-Frontend`
- Instalar dependências: `yarn install`
- Rodar Aplicação: `yarn start`

# Como criar esse projeto do zero

**Criação de projeto pelo template Typescript:** `create-react-app gobarberfrontend --template=typescript`.

Depois de instalar o template, vamos colocar todos o projeto dentro da pasta 'src' e limpar a estrutura do template.

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

## 📚 Instalação e Configuração das Bibliotecas Front-End

- **React-Router-DOM:** `yarn add react-router-dom`
- **Styled-Components:** `yarn add styled-components`
- **Cores:** `yarn add polished`
- **React-Icons:** `yarn add react-icons`
- **Axios**: `yarn add axios`
- **Formulários**: `yarn add @unform/core @unform/web`
- **Validação de formulário**: `yarn add yup`
- **Animações**: `yarn add react-spring`
- **Criação de ids**: `yarn add uuidv4`

Dependências de desenvolvimento:

- **Tipos do React-Router-DOM:** `yarn add @types/react-router-dom -D`
- **Tipos do Styled-Components:** `yarn add @types/styled-components -D`
- **Tipos do Validação de formulário**: `yarn add @types/yup -D`

## Component: Input

Nossa aplicação contém muitos inputs de formulário com o mesmo design, portanto vamos criar um component especifíco para esses inputs que será replicado quando necessário. Utilizaremos algumas bibliotecas:

InputHTMLAttributes do react. Um input do HTML contém alguns atributos padrão como placeholder, value, id, etc. O InputHTMLAttributes permite adicionar outros atributos customizados a um input, que não existem por padrão.

Nosso input sempre vai conter um ícone e um nome. Portanto vamos utilizar o InputHTMLAtributes para adicionar esses dois atributos como propriedades ao nosso component input. Para isso, criaremos uma interface, onde definiremos essas propriedades, assim como seus tipos.

Também vamos transformar nosso icone em um component, porque ele precisa mudar pra cada input que aparecer na aplicação e nos permite estiliza-lo também de forma independente. Para isso vamos utilizar a biblioteca: IconBaseProps do react-icons.

No final a interface vai ficar assim:

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
```

O useField do unform, que nos permite lidar com os inputs de formulário de uma formma mais simples.

# Formulário de Signup

[Documentação do Unform](https://unform.dev/guides/basic-form/)

Utilizamos a bilbioteca Unform para fazer o registro dos valores dos inputs. Isso significa que preciso informar quais campos do formulário vai monitorar, para trazer o valor quando der submit. Pra isso vamos usar o useField() e passar como parâmetro o nome do input, que vai funcionar como um id, ou seja, precisa ser único para cada input.

Pela função useField() eu consigo extrair 3 propriedades:

- fieldName: nome do input
- defaultValue: valor padrão inicial (pode ser vazio)
- registerField: a função que vai registrar os valores

Agora vamos colocar a função registerField, dentro de um useEffect para ser executada assim que o fieldName e o registerField mudarem.

```tsx
useEffect(() => {
  registerField({
    name: fieldName,
    ref: inputRef.current,
    path: 'value',
  });
}, [fieldName, registerField]);
```

## Função: useCallback()

Sempre que tivermos uma função que está dentro de outra função, vamos usar o useCallback(). Esta é uma ferramenta do React que faz com que essa função que está dentro da outra função (componente) não seja recriado toda vez que o componente atualiza (muda de estado).

## Component: Sign Up
