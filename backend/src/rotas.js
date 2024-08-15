const express = require('express');
const multer = require('./middleware/multer');
const verificaLogin = require('./middleware/verificaLogin');
const { cadastrarUsuario } = require('./controller/usuario');
const { login } = require('./controller/login');
const { listarCategoria, cadastrarCategoria, excluirCategoria, detalharCategoria, editarCategoria } = require('./controller/categoria');
const { listarFabricante, cadastrarFabricante, excluirFabricante, detalharFabricante, editarFabricante } = require('./controller/fabricante');
const { cadastrarProduto, listarProdutos, excluirProduto, detalharProduto } = require('./controller/produto');
const { listarFormaPag, detalharFormaPag, cadastrarFormaPag, editarFormaPag, excluirFormaPag } = require('./controller/forma_pagamento');

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

// produtos
rotas.post("/produto", multer.single("produto_imagem"), cadastrarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProduto);

//rotas.use(verificaLogin);

// categorias
rotas.get("/categoria", listarCategoria);
rotas.get("/categoria/:id", detalharCategoria);
rotas.post("/categoria", cadastrarCategoria);
rotas.put("/categoria/:id", editarCategoria);
rotas.delete("/categoria", excluirCategoria);

// fabricante
rotas.get("/fabricante", listarFabricante);
rotas.get("/fabricante/:id", detalharFabricante);
rotas.post("/fabricante", cadastrarFabricante);
rotas.put("/fabricante/:id", editarFabricante);
rotas.delete("/fabricante", excluirFabricante);


// forma pagamento
rotas.get("/formaPag", listarFormaPag);
rotas.get("/formaPag/:id", detalharFormaPag);
rotas.post("/formaPag", cadastrarFormaPag);
rotas.put("/formaPag/:id", editarFormaPag);
// rotas.delete("/formaPag", excluirFormaPag);

module.exports = rotas;