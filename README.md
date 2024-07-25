# Mega-Projeto
## Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).

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

    cd frontend/mega-farme/

    npm install
    npm install -g @vue/cli
    npm install sass@1.77.8
    npm install pug@3.0.3
    npm install pug pug-plain-loader --save-dev
    npm install -g yarn

Para rodar aplicação, navegue até "src":

    cd src
E rode a aplicação com o comando:

    yarn run serve
## Scripts disponíveis

### Backend

No arquivo `package.json` do backend, você encontrará os seguintes scripts:

-   `start`: Inicia o servidor backend usando `node`.
-   `dev`: Inicia o servidor backend usando `nodemon` para desenvolvimento, reiniciando automaticamente o servidor sempre que houver mudanças no código.

Para iniciar o servidor backend em modo de desenvolvimento, execute:

    npm run dev

Para iniciar o servidor backend em modo de produção, execute:

    npm start

