const knex = require("../db");
const bcrypt = require("bcrypt");

const editarSenha = async (req, res) => {
  const {senhaAntiga, senhaNova} = req.body;
	const {id} = req.usuario;

	try {
		const usuarioExiste = await knex("usuarios").where({id}).first();

		if (!usuarioExiste) {
			return res.status(404).json({mensagem: "Usuario não encontrado"});
		}

    const senhaCorreta = await bcrypt.compare(senhaAntiga, usuarioExiste.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Senha antiga incorreta" });
    }

    if (!validaSenha(senhaNova)) {
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

    const senhaHash = await bcrypt.hash(senhaNova, 10);

    await knex("usuarios").where({ id }).update({ senha: senhaHash });

    return res.status(200).json({ mensagem: "Senha atualizada com sucesso" });

	} catch (error) {
    console.error("Erro ao editar a senha:", error.message);
		return res.status(500).json({mensagem: "Erro interno do servidor"});
	}
}

module.exports = {
  editarSenha
}