const knex = require("../db");

const listarFabricante = async (req, res) => {
  try {
    const fabricantes = await knex("fabricantes")
    return res.status(200).json(fabricantes);

  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
}

const cadastrarFabricante = async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const fabricanteExistente = await knex("fabricantes").where({nome}).first();

		if (fabricanteExistente) {
			return res.status(400).json("Este fabricante já está cadastrado");
		}

    const fabricante = await knex("fabricantes").insert({ nome }).returning("*");

    if (!fabricante) {
      return res.status(400).json("O fabricante não foi cadastrado.");
    }

    return res.status(201).json("Fabricante cadastrado com sucesso.");

  } catch (error) {
    console.error("Erro ao cadastrar o fabricante:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

const detalharFabricante = async (req, res) => {
  const {id} = req.params;

	try {
		const fabricanteEncontrado = await knex
			.select("*")
			.from("fabricantes")
			.where({id})
			.first();

		if (!fabricanteEncontrado) {
			return res.status(404).json({mensagem: "Fabricante não encontrado"});
		}

		return res.status(200).json(fabricanteEncontrado);
	} catch (error) {
		console.error("Erro ao detalhar o fabricante:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const editarFabricante = async (req, res) => {
  const {nome} = req.body;
  const {id} = req.params;

  if (!nome || nome.trim() === "") {
    return res.status(400).json("O campo nome não pode estar vazio");
  }

  try {
    const fabricanteExistente = await knex("fabricantes").where({id}).first();

    if (!fabricanteExistente) {
      return res.status(400).json("O fabricante informado não existe");
    }

    const fabricante = await knex("fabricantes")
      .update({nome})
      .where({id})
      .returning("*");

    if (!fabricante) {
      return res.status(400).json("O fabricante não foi atualizado.");
    }

    return res.status(200).json("Fabricante editado com sucesso.");

  } catch (error) {
    console.error("Erro ao editar o fabricante:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
  }
}

const excluirFabricante = async (req, res) => {
  const {id} = req.params;

  try {
    const produtoComFab = await knex("produtos").where({fabricante_id: id}).first();

    if (produtoComFab) {
			return res.status(400).json({
        mensagem: "Não é possível excluir o fabricante, pois ele está vinculado a um produto.",
			});
		}

    await knex("fabricantes").where({id}).del();
    return res.status(200).json({ mensagem: "Fabricante excluído com sucesso." });

  } catch (error) {
    console.error("Erro ao excluir o fabricante:", error.message);
    return res.status(500).json({ mensagem: error.message });
  }
}

module.exports = {
  cadastrarFabricante,
  listarFabricante,
  detalharFabricante,
  editarFabricante,
  excluirFabricante
}