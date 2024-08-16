const knex = require("../db");

const criarCompra = async (req, res) => {
  const { usuario_id, forma_pagamento_id, carrinho_id } = req.body;

  if (!usuario_id || !forma_pagamento_id || !carrinho_id) {
    return res.status(400).json({ mensagem: "Dados insuficientes para criar a compra." });
  }

  try {
    const itensCarrinho = await knex("itens_carrinho").where({ carrinho_id });

    if (itensCarrinho.length === 0) {
      return res.status(400).json({ mensagem: "Carrinho vazio ou não encontrado." });
    }

    const valorTotal = itensCarrinho.reduce((total, item) => total + (item.quantidade * item.valor), 0);

    const compra = await knex("compra").insert({
      usuario_id,
      forma_pagamento_id,
      total: valorTotal,
      status_id: 1 // Pendente
    }).returning("*");

    if(!compra) {
      return res.status(400).json("A compra não foi cadastrada.");
    }

    return res.status(201).json(compra);

  } catch (error) {
    console.error("Erro ao criar a compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarStatusCompra = async (req, res) => {
  const { id } = req.params;
  const { status_id } = req.body;

  if (!status_id) {
    return res.status(400).json({ mensagem: "O status da compra é obrigatório." });
  }

  try {
    const compra = await knex("compra").where({ id }).first();
    if (!compra) {
      return res.status(404).json({ mensagem: "Compra não encontrada." });
    }

    const compraAtualizada = await knex("compra")
      .update({ status_id })
      .where({ id })
      .returning("*");

    if (!compraAtualizada) {
      return res.status(404).json({ mensagem: "O status da compra não foi atualizado." });
    }

    if (status_id === 2) {
      const itensCompra = await knex("itens_compra").where({ compra_id: id });
      if (itensCompra.length > 0) {
        const carrinhoId = itensCompra[0].carrinho_id;

        await knex("itens_carrinho").where({ carrinho_id: carrinhoId }).del();

        await knex("carrinho").where({ id: carrinhoId }).del();
      }
    }

    return res.status(200).json(compraAtualizada);

  } catch (error) {
    console.error("Erro ao atualizar o status da compra:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  criarCompra,
  atualizarStatusCompra
}