const knex = require("../db");

const adicionarItemCompra = async (req, res) => {
  const { compra_id, produto_id, quantidade } = req.body;

  if (!compra_id || !produto_id || quantidade === undefined) {
    return res.status(400).json({ mensagem: "Dados insuficientes para adicionar item à compra." });
  }

  try {
    const produto = await knex("produtos").where({ id: produto_id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const valorUnitario = produto.valor;
    const valorTotal = quantidade * valorUnitario;

    const item = await knex("itens_compra").insert({
      compra_id,
      produto_id,
      quantidade,
      valor: valorTotal
    }).returning("*");

    if(!item) {
      return res.status(400).json("O item não foi cadastrado.");
    }

    return res.status(201).json(item);

  } catch (error) {
    console.error("Erro ao adicionar item à compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarItensCompra = async (req, res) => {
  const { compra_id } = req.params;

  if (!compra_id) {
    return res.status(400).json({ mensagem: "ID da compra é necessário." });
  }

  try {
    const itens = await knex("itens_compra").where({ compra_id });

    if (itens.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum item encontrado para esta compra." });
    }

    return res.status(200).json(itens);

  } catch (error) {
    console.error("Erro ao listar itens da compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarItemCompra = async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  if (quantidade === undefined) {
    return res.status(400).json({ mensagem: "O campo quantidade é obrigatório." });
  }

  try {
    const itemExistente = await knex("itens_compra").where({ id }).first();

    if (!itemExistente) {
      return res.status(404).json({ mensagem: "Item não encontrado." });
    }


    const produto = await knex("produtos").where({ id: itemExistente.produto_id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const novoValor = quantidade * produto.valor;

    const itemAtualizado = await knex("itens_compra")
      .where({ id })
      .update({ quantidade, valor: novoValor })
      .returning("*");

    return res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar item da compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirItemCompra = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await knex("itens_compra").where({ id }).first();

    if (!item) {
      return res.status(404).json({ mensagem: "Item não encontrado." });
    }

    await knex("itens_compra").where({ id }).del();

    return res.status(200).json({ mensagem: "Item excluído com sucesso." });

  } catch (error) {
    console.error("Erro ao excluir item da compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  adicionarItemCompra,
  listarItensCompra,
  atualizarItemCompra,
  excluirItemCompra
}