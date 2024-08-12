const express = require('express');
const verificaLogin = require('./middleware/verificaLogin');
const { cadastrarUsuario } = require('./controller/usuario');
const { login } = require('./controller/login');

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(verificaLogin);

module.exports = rotas;
