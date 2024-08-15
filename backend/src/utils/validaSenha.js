const validaSenha = (senha) => {
  if (senha.length < 6 || senha.length > 10)
    return false;

  const temMaiuscula = /[A-Z]/.test(senha);

  const temMinuscula = /[a-z]/.test(senha);

  const temNumero = /\d/.test(senha);

  const temChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return temMaiuscula && temMinuscula && temNumero && temChar;
}

module.exports = validaSenha;