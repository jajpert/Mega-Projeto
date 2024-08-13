const knex = require("../db");

const listarCategoria = async (req, res) => {
  try {
    const categorias = await knex('categorias')
    return res.status(200).json(categorias);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const cadastrarCategoria = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === '') {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const categoriaExistente = await knex("categorias").where({nome}).first();

		if (categoriaExistente) {
			return res.status(400).json("Esta categoria já está cadastrada");
		}

    await knex("categorias").insert({ nome });

    return res.status(201).json("Categoria cadastrada com sucesso.");

  } catch (error) {
    console.error('Erro ao cadastrar a categoria:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  listarCategoria,
  cadastrarCategoria
}