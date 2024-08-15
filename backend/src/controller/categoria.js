const knex = require("../db");

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

const listarCategoria = async (req, res) => {
  try {
    const categorias = await knex('categorias')
    return res.status(200).json(categorias);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const detalharCategoria = async (req, res) => {
  const {id} = req.params;

	try {
		const categoriaEncontrada = await knex
			.select("*")
			.from("categorias")
			.where({id})
			.first();

		if (!categoriaEncontrada) {
			return res.status(404).json({mensagem: "Categoria não encontrada"});
		}

		return res.status(200).json(categoriaEncontrada);
	} catch (error) {
		console.error('Erro ao detalhar a categoria:', error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const editarCategoria = async (req, res) => {
  const {nome} = req.body;
  const {id} = req.params;

  if (!nome || nome.trim() === '') {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const categoriaExistente = await knex("categorias").where({id}).first();

    if (!categoriaExistente) {
      return res.status(400).json("A categoria informada não existe");
    }

    const categoria = await knex("categorias")
      .update({nome})
      .where({id})
      .returning("*");

    if (!categoria) {
      return res.status(400).json("A categoria não foi atualizada.");
    }

    return res.status(200).json("Categoria editada com sucesso.");

  } catch (error) {
    console.error('Erro ao editar a categoria:', error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

const excluirCategoria = async (req, res) => {
  const {id} = req.params;

  try {
    const produtoComCat = await knex("produtos").where({categoria_id: id}).first();

    if (produtoComCat) {
			return res.status(400).json({
        mensagem: "Não é possível excluir a categoria, pois ela está vinculada a um produto.",
			});
		}
  } catch (error) {
    console.error('Erro ao excluir a categoria:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  cadastrarCategoria,
  listarCategoria,
  detalharCategoria,
  editarCategoria,
  excluirCategoria
}