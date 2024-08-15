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
  nome VARCHAR
);