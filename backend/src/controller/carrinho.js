const knex = require("../db");

const criarCarrinho = async (req, res) => {
  const { id } = req.usuario;

  try {
    const carrinho = await knex("carrinhos")
      .insert({ usuario_id: id })
      .returning("*");

    if(!carrinho) {
      return res.status(400).json("O carrinho não foi cadastrado.");
    }

    return res.status(201).json(carrinho);
  } catch (error) {
    console.error("Erro ao criar o carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

const excluirCarrinho = async (req, res) => {
  const { id } = req.params;

  try {
    const carrinhoExistente = await knex("carrinho").where({id}).first();

    if (!carrinhoExistente) {
      return res.status(404).json({ mensagem: "Carrinho não encontrado." });
    }

    await knex("itens_carrinho").where({ carrinho_id: id }).del();
    await knex("carrinho").where({ id }).del();

    return res.status(200).json({ mensagem: "Carrinho e itens excluídos com sucesso." });

  } catch (error) {
    console.error("Erro ao excluir o carrinho:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  criarCarrinho,
  excluirCarrinho
}
