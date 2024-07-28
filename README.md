# Mega-Projeto

## Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).

Para o frontend, é necessário ter o Yarn instalado globalmente. Você pode instalar o Yarn executando o seguinte comando no terminal:

    npm install -g yarn

## Clonando o repositório

Para clonar o repositório, execute o seguinte comando no terminal:

    git clone https://github.com/jajpert/Mega-Projeto.git

## Navegando até o diretório do projeto

Navegue até o diretório do projeto:

    cd Mega-Projeto

## Instalando as dependências

### Backend

Navegue até o diretório do backend e instale as dependências:

    cd backend
    npm install

### Frontend

Navegue até o diretório do frontend e instale as dependências:

    cd ..
    cd frontend/mega-farme/
    yarn install

Para rodar aplicação, certifique de estar na pasta "mega-farme" e rode a aplicação com qualquer um desses comandos:

    yarn run serve
---
    yarn serve

## Scripts disponíveis

### Backend

No arquivo `package.json` do backend, você encontrará os seguintes scripts:

- `start`: Inicia o servidor backend usando `node`.
- `dev`: Inicia o servidor backend usando `nodemon` para desenvolvimento, reiniciando automaticamente o servidor sempre que houver mudanças no código.

Para iniciar o servidor backend em modo de desenvolvimento, execute:

    npm run dev

Para iniciar o servidor backend em modo de produção, execute:

    npm start
