const knex = require("../db");

const adicionarItemCarrinho = async (req, res) => {
  const { carrinho_id, produto_id, quantidade } = req.body;

  const camposObrigatorios = [
    { campo: carrinho_id, nomeCampo: "carrinho_id" },
    { campo: produto_id, nomeCampo: "produto_id" },
    { campo: quantidade, nomeCampo: "quantidade" }
  ];

  const camposVazio = camposObrigatorios
  .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
  .map(({ nomeCampo }) => nomeCampo);

  if (camposVazio.length > 0) {
    return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(", ")} são obrigatórios` });
  }

  try {
    const produto = await knex("produtos").where({id: produto_id}).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const valor_unitario = produto.valor;
    const valor_total = valor_unitario * quantidade;

    const item = await knex("itens_carrinho")
      .insert({ carrinho_id, produto_id, quantidade, valor: valor_total })
      .returning("*");

    if(!item) {
      return res.status(400).json("O item não foi cadastrado.");
    }

    return res.status(201).json(item);

  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

const listarItensCarrinho = async (req, res) => {
  const { carrinho_id } = req.params;

  try {
    const itens = await knex("itens_carrinho")
      .where({ carrinho_id });

    return res.status(200).json(itens);

  } catch (error) {
    console.error("Erro ao listar itens do carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

const atualizarItemCarrinho = async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  if (!quantidade) {
    return res.status(400).json({mensagem: "O campo quantidade é obrigatório."});
  }

  try {
    const item = await knex("itens_carrinho")
      .where({ id })
      .first();

    if (!item) {
      return res.status(404).json({ mensagem: "Item não encontrado." });
    }

    const produto = await knex("produtos").where({ id: item.produto_id }).first();
    const valor_unitario = produto.valor;

    const itemAtualizado = await knex("itens_carrinho")
      .update({ quantidade, valor: valor_unitario * quantidade })
      .where({ id })
      .returning("*");

    return res.status(200).json(itemAtualizado);

  } catch (error) {
    console.error("Erro ao atualizar o item do carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}


const excluirItemCarrinho = async (req, res) => {
  const {id} = req.params;

  try {
    const itemExistente = await knex("itens_carrinho")
      .where({id})
      .first();

    if (!itemExistente) {
      return res.status(404).json({ mensagem: "Item não encontrado." });
    }

    await knex("itens_carrinho")
      .where({id})
      .del();

    return res.status(200).json({ mensagem: "Item excluído com sucesso." });

  } catch (error) {
    console.error("Erro ao excluir o item do carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  adicionarItemCarrinho,
  listarItensCarrinho,
  atualizarItemCarrinho,
  excluirItemCarrinho
}