CREATE DATABASE mega_farma;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR,
  cpf VARCHAR UNIQUE NOT NULL,
  telefone VARCHAR,
  email VARCHAR,
  endereco TEXT,
  senha TEXT,
  adm BOOLEAN
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR
);

CREATE TABLE fabricantes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR
);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
  nome VARCHAR,
  nome_cientifico VARCHAR,
  valor MONEY,
  quantidade INT,
  validade DATE,
  categoria_id INT,
  fabricante_id INT,
  produto_imagem VARCHAR
);

CREATE TABLE forma_pagamentos (
	id SERIAL PRIMARY KEY,
  nome VARCHAR,
  status_id BOOLEAN
);

CREATE TABLE carrinhos (
  id SERIAL PRIMARY KEY,
  usuario_id INT,
  data_criacao TIMESTAMP DEFAULT NOW()
);

CREATE TABLE itens_carrinho (
  id SERIAL PRIMARY KEY,
  carrinho_id INT,
  produto_id INT,
  quantidade INT,
  valor MONEY
);

CREATE TABLE status (
	id SERIAL PRIMARY KEY,
  nome VARCHAR
);

INSERT INTO status (nome) VALUES
('Pendente'),
('Concluída'),
('Cancelada'),
('Ativo'),
('Inativo');

CREATE TABLE compra (
  id SERIAL PRIMARY KEY,
  usuario_id INT,
  forma_pagamento_id INT,
  data_compra TIMESTAMP DEFAULT NOW(),
  total MONEY,
  status_id VARCHAR
);

CREATE TABLE itens_compra (
  id SERIAL PRIMARY KEY,
  compra_id INT,
  produto_id INT,
  quantidade INT,
  valor MONEY
);