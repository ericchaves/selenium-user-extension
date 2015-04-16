function bankingGenerator(bankId){
  if ("number" !== typeof bankId)
    throw new Error("Número do banco é obrigatório.");
  var bancos = {
    1: {}
  }, result = {
    banco: bankId, 
    nome: '',
    agencia: '',
    digitoAgencia: '',
    conta: '',
    digitoConta: ''
  } 
  if (!bancos[bankId])
    throw new Error("Número do banco não suportado.");

  return result;
}