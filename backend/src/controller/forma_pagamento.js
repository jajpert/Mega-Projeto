const knex = require("../db");

const listarFormaPag = async (req, res) => {
  try {
    const formaPag = await knex("forma_pagamentos")
    return res.status(200).json(formaPag);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const cadastrarFormaPag = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const formaPagExistente = await knex("forma_pagamentos").where({ nome }).first();

    if (formaPagExistente) {
      return res.status(400).json("Esta forma de pagamento já está cadastrada");
    }

    const formaPag = await knex("forma_pagamentos")
      .insert({ nome, status_id: 4 })
      .returning("*");

    if (!formaPag) {
      return res.status(400).json("A forma de pagamento não foi cadastrada.");
    }

    return res.status(201).json("Forma de pagamento cadastrada com sucesso.");

  } catch (error) {
    console.error("Erro ao cadastrar a forma de pagamento:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharFormaPag = async (req, res) => {
  const {id} = req.params;

	try {
		const formaPagEncontrado = await knex
			.select("*")
			.from("forma_pagamentos")
			.where({id})
			.first();

		if (!formaPagEncontrado) {
			return res.status(404).json({mensagem: "Forma de pagamento não encontrada"});
		}

		return res.status(200).json(formaPagEncontrado);
	} catch (error) {
		console.error("Erro ao detalhar a forma de pagamento:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const editarFormaPag = async (req, res) => {
  const { nome, status_id } = req.body;
  const { id } = req.params;

  if (!nome && !status_id) {
    return res.status(400).json("Os campos nome e status_id não podem estar vazios, preencha algum.");
  }

  try {
    const formaPagExistente = await knex("forma_pagamentos").where({ id }).first();
    if (!formaPagExistente) {
      return res.status(404).json("A forma de pagamento informada não existe");
    }

    const camposAtualizados = {};
    if (nome) camposAtualizados.nome = nome;
    if (status_id !== undefined) camposAtualizados.status_id = status_id;

    const formaPagAtualizada = await knex("forma_pagamentos")
      .update(camposAtualizados)
      .where({ id })
      .returning("*");

    if (!formaPagAtualizada || formaPagAtualizada.length === 0) {
      return res.status(400).json("A forma de pagamento não foi atualizada.");
    }

    return res.status(200).json("Forma de pagamento editada com sucesso.");

  } catch (error) {
    console.error("Erro ao editar a forma de pagamento:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirFormaPag = async (req, res) => {
  const { id } = req.params;

  try {
      const formaPagExistente = await knex("formas_pagamento").where({ id }).first();
      if (!formaPagExistente) {
          return res.status(400).json({ mensagem: "A forma de pagamento informada não existe." });
      }

      const formaPagEmCompra = await knex("compra").where({ forma_pagamento_id: id }).first();
      if (formaPagEmCompra) {
          return res.status(400).json({ mensagem: "Não é possível excluir a forma de pagamento, pois ela está vinculada a uma compra." });
      }

      const formaPagExcluida = await knex("formas_pagamento")
          .where({ id })
          .del();

      if (!formaPagExcluida) {
          return res.status(400).json({ mensagem: "A forma de pagamento não foi excluída." });
      }

      return res.status(200).json({ mensagem: "A forma de pagamento foi excluída com sucesso." });

  } catch (error) {
      console.error("Erro ao excluir a forma de pagamento:", error.message);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarFormaPag,
  listarFormaPag,
  detalharFormaPag,
  editarFormaPag,
  excluirFormaPag
}