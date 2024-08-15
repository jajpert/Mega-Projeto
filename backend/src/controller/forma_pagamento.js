const knex = require("../db");

const listarFormaPag = async (req, res) => {
  try {
    const formaPag = await knex('forma_pagamentos')
    return res.status(200).json(formaPag);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const cadastrarFormaPag = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const formaPagExistente = await knex("forma_pagamentos").where({nome}).first();

		if (formaPagExistente) {
			return res.status(400).json("Esta forma de pagamento já está cadastrada");
		}

    const formaPag = await knex("forma_pagamentos").insert({ nome }).returning("*");

    if (!formaPag) {
      return res.status(400).json("A forma de pagamento não foi cadastrada.");
    }

    return res.status(201).json("Forma de pagamento cadastrada com sucesso.");

  } catch (error) {
    console.error('Erro ao cadastrar a forma de pagamento:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

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
		console.error('Erro ao detalhar a forma de pagamento:', error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const editarFormaPag = async (req, res) => {
  const {nome} = req.body;
  const {id} = req.params;

  if (!nome || nome.trim() === '') {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const formaPagExistente = await knex("forma_pagamentos").where({id}).first();

    if (!formaPagExistente) {
      return res.status(400).json("A forma de pagamento informada não existe");
    }

    const formaPag = await knex("forma_pagamentos")
      .update({nome})
      .where({id})
      .returning("*");

    if (!formaPag) {
      return res.status(400).json("A forma de pagamento não foi atualizada.");
    }

    return res.status(200).json("Forma de pagamento editada com sucesso.");

  } catch (error) {
    console.error('Erro ao editar a forma de pagamento:', error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

const excluirFormaPag = async (req, res) => {
  
}

module.exports = {
  cadastrarFormaPag,
  listarFormaPag,
  detalharFormaPag,
  editarFormaPag,
  excluirFormaPag
}