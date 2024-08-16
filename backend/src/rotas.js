const express = require('express');
const multer = require('./middleware/multer');
const verificaLogin = require('./middleware/verificaLogin');
const { verificaAdmin } = require('./middleware/verificaAdm');
const { cadastrarUsuario, excluirUsuario, detalharUsuario } = require('./controller/usuario');
const { login } = require('./controller/login');
const { listarCategoria, cadastrarCategoria, excluirCategoria, detalharCategoria, editarCategoria } = require('./controller/categoria');
const { listarFabricante, cadastrarFabricante, excluirFabricante, detalharFabricante, editarFabricante } = require('./controller/fabricante');
const { cadastrarProduto, listarProdutos, excluirProduto, detalharProduto } = require('./controller/produto');
const { listarFormaPag, detalharFormaPag, cadastrarFormaPag, editarFormaPag, excluirFormaPag } = require('./controller/forma_pagamento');
const { editarSenha } = require('./controller/senha');
const { criarCarrinho, excluirCarrinho } = require('./controller/carrinho');
const { adicionarItemCarrinho, listarItensCarrinho, atualizarItemCarrinho, excluirItemCarrinho } = require('./controller/itens_carrinho');
const { criarCompra, atualizarStatusCompra } = require('./controller/compra');
const { adicionarItemCompra, listarItensCompra, atualizarItemCompra, excluirItemCompra } = require('./controller/itens_compra');
const gerarRelatorioPDF = require('./controller/pdf');

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

// rotas.use(verificaLogin);

// senha
rotas.patch("/usuario/senha", editarSenha);

// usuario
rotas.delete("/usuario/:id", excluirUsuario);
rotas.get("/usuario/:id", detalharUsuario);

// produtos
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);

// categorias
rotas.get("/categoria", listarCategoria);

// fabricante
rotas.get("/fabricante", listarFabricante);

// forma pagamento
rotas.get("/formaPag", listarFormaPag);

// carrinho
rotas.post("/carrinho", criarCarrinho);
rotas.delete("/carrinho", excluirCarrinho);

// itens_carrinho
rotas.post("/itens_carrinho", adicionarItemCarrinho);
rotas.get("/itens_carrinho", listarItensCarrinho);
rotas.patch("/itens_carrinho", atualizarItemCarrinho);
rotas.delete("/itens_carrinho", excluirItemCarrinho);

// compra
rotas.post("/compra", criarCompra);
rotas.patch("/compra", atualizarStatusCompra);

// itens_compra
rotas.post("/itens_compra", adicionarItemCompra);
rotas.get("/itens_compra", listarItensCompra);
rotas.put("/itens_compra", atualizarItemCompra);
rotas.delete("/itens_compra", excluirItemCompra);


//rotas.use(verificaAdmin);

// rotas ADM

rotas.get("/gerar-relatorio", gerarRelatorioPDF);

// produto
rotas.post("/produto", multer.single("produto_imagem"), cadastrarProduto);
rotas.delete("/produto/:id", excluirProduto);

// categoria
rotas.get("/categoria/:id", detalharCategoria);
rotas.post("/categoria", cadastrarCategoria);
rotas.put("/categoria/:id", editarCategoria);
rotas.delete("/categoria", excluirCategoria);

// fabricante
rotas.get("/fabricante/:id", detalharFabricante);
rotas.post("/fabricante", cadastrarFabricante);
rotas.put("/fabricante/:id", editarFabricante);
rotas.delete("/fabricante", excluirFabricante);

// forma pagamento
rotas.get("/formaPag/:id", detalharFormaPag);
rotas.post("/formaPag", cadastrarFormaPag);
rotas.put("/formaPag/:id", editarFormaPag);
rotas.delete("/formaPag", excluirFormaPag);

module.exports = rotas;