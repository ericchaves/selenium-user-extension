describe('Gerador de dados bancários', function() {
  it('deve exportar uma funcao bankingGenerator', function() {
    expect(bankingGenerator).toBeDefined();
  });

  it('deve requerer um número de entrada', function(){
    expect(bankingGenerator).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator(null)}).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator({})}).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator('341')}).toThrowError('Número do banco é obrigatório.');
  });

  it('deve gerar um erro quando o banco não é conhecido', function(){
    expect(function(){bankingGenerator(123)}).toThrowError('Número do banco não suportado.');
  });

  describe('Quando receber o número de um banco suportado',function(){
    it('deve retornar um objeto', function(){
      expect(typeof bankingGenerator(1)).toBe('object');
    });

    it('deve conter uma agência', function(){
      expect(bankingGenerator(1).agencia).toBeDefined();
    });

    it('deve conter o DV da agência', function(){
      expect(bankingGenerator(1).digitoAgencia).toBeDefined();
    });

    it('deve conter uma conta', function(){
      expect(bankingGenerator(1).conta).toBeDefined();
    });

    it('deve conter o DV da conta', function(){
      expect(bankingGenerator(1).digitoConta).toBeDefined();
    });

    it('deve conter o nome do banco', function(){
      expect(bankingGenerator(1).nome).toBeDefined();
    });
  });

});