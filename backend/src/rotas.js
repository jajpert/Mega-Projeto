const express = require('express');
const multer = require('./middleware/multer');
const verificaLogin = require('./middleware/verificaLogin');
const { cadastrarUsuario } = require('./controller/usuario');
const { login } = require('./controller/login');
const { listarCategoria, cadastrarCategoria } = require('./controller/categoria');
const { listarFabricante, cadastrarFabricante } = require('./controller/fabricante');
const { cadastrarProduto, listarProdutos, excluirProduto, detalharProduto } = require('./controller/produto');

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);
//
rotas.post("/produto", multer.single("produto_imagem"), cadastrarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto", excluirProduto);
//
rotas.use(verificaLogin);

rotas.get("/categoria", listarCategoria)
rotas.post("/categoria", cadastrarCategoria)
rotas.get("/fabricante", listarFabricante)
rotas.post("/fabricante", cadastrarFabricante)


module.exports = rotas;