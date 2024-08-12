# Mega-Projeto

## Pré-requisitos

Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).

Além disso, o projeto utiliza o PostgreSQL como banco de dados. Você precisará instalá-lo e configurá-lo na sua máquina. Você pode obter o PostgreSQL [aqui](https://www.postgresql.org/download/).

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

## Configurando o banco de dados

1. Certifique-se de que o PostgreSQL está instalado e em execução.

2. Crie uma base de dados para o projeto. Você pode fazer isso usando a ferramenta de linha de comando `psql` ou qualquer cliente de PostgreSQL de sua escolha. Execute o seguinte comando para criar a base de dados:

    ```bash
    createdb mega_farme
    ```

3. Configure as variáveis de ambiente para o banco de dados no arquivo `.env` na pasta `backend`. Exemplo de configuração:

    ```
    DB_HOST=[string]
    DB_PORT=[number]
    DB=[string]
    DB_USER=[string]
    DB_PASS=[string]
    ```

## Rodando a aplicação

Para rodar a aplicação, certifique-se de estar na pasta `mega-farme` e execute a aplicação com qualquer um desses comandos:

    yarn run serve
    # ou
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