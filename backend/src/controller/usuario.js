const knex = require('../db');
const validaCpf = require('../utils/validaCpf');
const bcrypt = require('bcrypt');

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
    return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(', ')} são obrigatórios` });
  }
  try {

    const emailExistente = await knex("usuarios").where({email}).first();

		if (emailExistente) {
			return res.status(400).json("O email já está em uso por outro usuário");
		}

    const cpfValidado = validaCpf(cpf);

    if(!cpfValidado) {
      return res.status(400).json("CPF inválido.");
    }

    const cpfExistente = await knex("usuarios").where({cpf}).first();

    if(cpfExistente) {
      return res.status(400).json("O CPF já está em uso por outro usuário.");
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
    console.error('Erro ao cadastrar o usuário:', error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

const excluirUsuario = async (req, res) => {

}

const buscarUsuario = async (req, res) => {
  
}

module.exports = {
  cadastrarUsuario
}