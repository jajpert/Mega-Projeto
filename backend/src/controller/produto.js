const knex = require('../db');
const { uploadImagem, excluirImagem, listagemImagens } = require('../services/storage');

const cadastrarProduto = async (req, res) => {
  const { nome, nome_cientifico, valor, quantidade, validade, categoria_id, fabricante_id } = req.body;
  let produto_imagem = null;

  if(req.file) {
    const {originalname, mimetype, buffer} = req.file;

    try {
      const categoriaExistente = await knex("categorias")
				.where({id: categoria_id})
				.first();

			if (!categoriaExistente) {
				return res.status(404).json("A categoria informada não existe");
			}

      const fabricanteExistente = await knex("fabricantes")
				.where({id: fabricante_id})
				.first();

			if (!fabricanteExistente) {
				return res.status(404).json("O fabricante informado não existe");
			}

      if (quantidade < 0 || valor < 0) {
				return res.status(400).json("Não são permitidos valores negativos.");
			}

      let produto = await knex("produtos")
				.insert({
					nome,
					nome_cientifico,
					valor,
          quantidade,
          validade,
					categoria_id,
          fabricante_id,
					produto_imagem,
				})
				.returning("*");

			if (!produto) {
				return res.status(400).json("O produto não foi cadastrado.");
			}

			const id = produto[0].id;

      const imagemDoProduto = await uploadImagem(
				`produtos/${id}/${originalname}`,
				buffer,
				mimetype
			);

			produto = await knex("produtos")
				.update({
					produto_imagem: imagemDoProduto.url,
				})
				.where({id})
				.returning("*");

			return res.status(201).json(produto[0]);

    } catch (error) {
      return res.status(500).json({mensagem: "Erro interno do servidor"});
    }
  } else{
    return res.status(500).json({mensagem: "É necessário enviar uma imagem do produto"});
  }
}

const listarProdutos = async (req, res) => {
  
}

const detalharProduto = async (req, res) => {
  const {id} = req.params;

	try {
		const produtoEncontrado = await knex
			.select("*")
			.from("produtos")
			.where({id})
			.first();

		if (!produtoEncontrado) {
			return res.status(404).json({mensagem: "Produto não encontrado"});
		}

		return res.status(200).json(produtoEncontrado);
	} catch (error) {
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const excluirProduto = async (req, res) => {

}

module.exports = {
  cadastrarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto
}