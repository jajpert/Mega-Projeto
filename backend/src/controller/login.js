const knex = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const camposObrigatorios = [
      { campo: email, nomeCampo: "email" },
      { campo: senha, nomeCampo: "senha" }
    ];

    const camposVazio = camposObrigatorios
    .filter(({ campo }) => campo === undefined || campo === null || campo.trim() === "")
    .map(({ nomeCampo }) => nomeCampo);

    if (camposVazio.length > 0) {
      return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(', ')} são obrigatórios` });
    }

    const usuario = await knex ('usuarios').where({email}).first();

    if (!usuario){
      return res.status(404).json({mensagem:'E-mail ou senha inválido'})
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if(!senhaValida){
      return res.status(404).json({mensagem:'E-mail ou senha inválido'})
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, adm: usuario.adm }, process.env.KEY_JWT, {
			expiresIn: '8h',
		})

    // const { senha: _, ...usuarioLogado } = usuario;
		// return res.json({ usuario: usuarioLogado, token })

    return res.json({ token })

  } catch (error) {
    console.error('Erro ao logar o usuário:', error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}

module.exports = {
  login
}
