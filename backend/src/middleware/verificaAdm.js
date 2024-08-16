const verificaAdmin = (req, res, next) => {
	if (!req.usuario) {
		return res.status(401).json("Usuário não está logado");
	}

	if (req.usuario.adm !== true) {
		return res.status(403).json("Acesso negado: usuário não é administrador");
	}

	next();
};

module.exports = {
  verificaAdmin
}