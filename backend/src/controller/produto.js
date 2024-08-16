const knex = require("../db");
const { uploadImagem, excluirImagem } = require("../services/storage");

const cadastrarProduto = async (req, res) => {
  const { nome, nome_cientifico, valor, quantidade, validade, categoria_id, fabricante_id } = req.body;
  let produto_imagem = null;

	const camposObrigatorios = [
    { campo: nome, nomeCampo: "nome" },
    { campo: valor, nomeCampo: "valor" },
    { campo: quantidade, nomeCampo: "quantidade" },
    { campo: categoria_id, nomeCampo: "categoria_id" },
    { campo: fabricante_id, nomeCampo: "fabricante_id" }
  ];

  const camposVazio = camposObrigatorios
  .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
  .map(({ nomeCampo }) => nomeCampo);

  if (camposVazio.length > 0) {
    return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(", ")} são obrigatórios` });
  }

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
			console.log("entrouauqiu", error)
      return res.status(500).json({mensagem: "Erro interno do servidor"});
    }
  } else{
    return res.status(500).json({mensagem: "É necessário enviar uma imagem do produto"});
  }
}

const listarProdutos = async (req, res) => {
  try {
		const produtos = await knex .select("*").from("produtos");

		if (!produtos) {
			return res.status(404).json({mensagem: "Nenhum produto cadastrado"});
		}

		return res.status(200).json(produtos);

	} catch (error) {
		console.error("Erro ao listar os produtos:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
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
		console.error("Erro ao detalhar o produto:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

const excluirProduto = async (req, res) => {
	const {id} = req.params;

	try {
		const produtoExistente = await knex("produtos").where({id}).first();
		if (!produtoExistente) {
			return res.status(400).json("O produto informado não existe");
		}

		const produtoEmCarrinho = await knex("itens_carrinho")
			.where({ produto_id: id })
			.first();

		if (produtoEmCarrinho) {
			return res.status(400).json({ mensagem: "Não é possível excluir o produto, pois ele está vinculado a um carrinho." });
		}

		const produtoEmCompra = await knex("itens_compra")
			.where({ produto_id: id })
			.first();

		if (produtoEmCompra) {
			return res.status(400).json({ mensagem: "Não é possível excluir o produto, pois ele está vinculado a uma compra." });
		}

		const imagemURL = produtoExistente.produto_imagem;

		if (imagemURL !== null) {
			await excluirImagem(imagemURL);
		}

		const produtoExcluido = await knex("produtos")
			.where({id})
			.update({
				produto_imagem: null,
			})
			.del();

		if (!produtoExcluido) {
			return res.status(400).json("O produto não foi excluído.");
		}
		return res.status(200).json("O produto foi excluído com sucesso.");

	} catch (error) {
		console.error("Erro ao excluir o produto:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

module.exports = {
  cadastrarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto
}