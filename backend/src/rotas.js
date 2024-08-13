const express = require('express');
const verificaLogin = require('./middleware/verificaLogin');
const { cadastrarUsuario } = require('./controller/usuario');
const { login } = require('./controller/login');
const { listarCategoria, cadastrarCategoria } = require('./controller/categoria');
const { listarFabricante, cadastrarFabricante } = require('./controller/fabricante');

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.get("/categoria", listarCategoria)
rotas.post("/categoria", cadastrarCategoria)
rotas.get("/fabricante", listarFabricante)
rotas.post("/fabricante", cadastrarFabricante)

rotas.use(verificaLogin);


module.exports = rotas;