CREATE DATABASE mega_farme;

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  nome VARCHAR,
  cpf VARCHAR UNIQUE NOT NULL,
  telefone VARCHAR,
  email VARCHAR,
  endereco TEXT,
  senha TEXT,
  adm BOOLEAN
);