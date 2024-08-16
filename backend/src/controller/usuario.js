const knex = require("../db");
const validaCpf = require("../utils/validaCpf");
const validaSenha = require("../utils/validaSenha")
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, cpf, telefone, email, endereco, senha } = req.body;

  const camposObrigatorios = [
    { campo: nome, nomeCampo: "nome" },
    { campo: cpf, nomeCampo: "cpf" },
    { campo: telefone, nomeCampo: "telefone" },
    { campo: email, nomeCampo: "email" },
    { campo: senha, nomeCampo: "senha" }
  ];

  const camposVazio = camposObrigatorios
  .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
  .map(({ nomeCampo }) => nomeCampo);

  if (camposVazio.length > 0) {
    return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(", ")} são obrigatórios` });
  }

  try {

    const emailExistente = await knex("usuarios").where({email}).first();

		if (emailExistente) {
			return res.status(400).json("O email já está em uso por outro usuário");
		}

    if(!validaCpf(cpf)) {
      return res.status(400).json("CPF inválido.");
    }

    const cpfExistente = await knex("usuarios").where({cpf}).first();

    if(cpfExistente) {
      return res.status(400).json("O CPF já está em uso por outro usuário.");
    }

    if (!validaSenha(senha)) {
      return res.status(400).json({
        error: "Senha inválida",
        message: "A senha deve atender aos seguintes critérios:",
        requirements: [
          "Ter entre 6 e 10 caracteres",
          "Incluir pelo menos uma letra maiúscula",
          "Incluir pelo menos uma letra minúscula",
          "Incluir pelo menos um número",
          "Incluir pelo menos um caractere especial (ex: !, @, #, $, %, &, *)"
        ]
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
    .insert({nome, cpf, telefone, email, endereco, senha: senhaCriptografada})
    .returning("*");

    if (!usuario) {
      return res.status(400).json("O usuário não foi cadastrada.");
    }

    return res.json("O usuario foi cadastrado com sucesso!");

  } catch (error) {
    console.error("Erro ao cadastrar o usuário:", error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const editarUsuario = async (req, res) => {
	const {nome, email, senha} = req.body;
	const {id} = req.usuario;

	try {
		const usuarioExiste = await knex("usuarios").where({id}).first();

		if (!usuarioExiste) {
			return res.status(404).json({mensagem: "Usuario não encontrado"});
		}

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		if (email !== req.usuario.email) {
			const emailUsuarioExiste = await knex("usuarios").where({email}).first();

			if (emailUsuarioExiste) {
				res.status(400).json({mensagem: "O Email já existe."});
				return;
			}
		}

		const usuario = await knex("usuarios")
			.where({id})
			.update({
				nome,
				email,
				senha: senhaCriptografada,
			})
			.returning("*");
		const {senha: _, ...usuarioCadastrado} = usuario[0];

		res.status(204).json(usuarioCadastrado);
		return;
	} catch (error) {
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
};

const excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await knex('usuarios').where({ id }).first();
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    await knex('itens_compra')
      .whereIn('compra_id', function () {
        this.select('id').from('compra').where({ usuario_id: id });
      })
      .del();

    await knex('compra').where({ usuario_id: id }).del();

    await knex('itens_carrinho')
      .whereIn('carrinho_id', function () {
        this.select('id').from('carrinhos').where({ usuario_id: id });
      })
      .del();

    await knex('carrinhos').where({ usuario_id: id }).del();

    await knex('usuarios').where({ id }).del();

    return res.status(200).json({ mensagem: "Usuário e dados relacionados excluídos com sucesso." });

  } catch (error) {
    console.error('Erro ao excluir o usuário:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await knex('usuarios')
      .select('nome', 'cpf', 'telefone', 'email', 'endereco')
      .where({ id })
      .first();

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    return res.status(200).json(usuario);

  } catch (error) {
    console.error('Erro ao detalhar o usuário:', error.message);
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario,
  detalharUsuario
}