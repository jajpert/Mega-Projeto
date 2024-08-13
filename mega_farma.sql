CREATE DATABASE mega_farme;

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