const knex = require("../db");

const listarFabricante = async (req, res) => {
  try {
    const fabricantes = await knex('fabricantes')
    return res.status(200).json(fabricantes);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const cadastrarFabricante = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const fabricanteExistente = await knex("fabricantes").where({nome}).first();

		if (fabricanteExistente) {
			return res.status(400).json("Este fabricante já está cadastrado");
		}

    await knex("fabricantes").insert({ nome });

    return res.status(201).json("Fabricante cadastrado com sucesso.");

  } catch (error) {
    console.error('Erro ao cadastrar o fabricante:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  listarFabricante,
  cadastrarFabricante
}