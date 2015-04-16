describe('Gerador de contas bancárias', function() {
  it('deve exportar uma funcao bankingGenerator', function() {
    expect(bankingGenerator).toBeDefined();
  });

  it('deve requerer um número de entrada', function(){
    expect(bankingGenerator).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator(null)}).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator({})}).toThrowError('Número do banco é obrigatório.');
    expect(function(){bankingGenerator('341')}).not.toThrowError('Número do banco é obrigatório.');
  });

  it('deve gerar um erro quando o banco não é suportado', function(){
    expect(function(){bankingGenerator(123)}).toThrowError('Banco 123 não suportado.');
  });
  
  it('aceita opcionalmente uma lista com um ou mais de tipos de conta',function(){
	expect(typeof bankingGenerator(1, [])).toBe('object');
	expect(typeof bankingGenerator(1, ['01','000'])).toBe('object');
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

  describe('Quando o código recebido for 1 (BB)', function(){
    it('deve retornar o nome Banco do Brasil', function(){
      expect(bankingGenerator(1).nome).toEqual('Banco do Brasil');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(1).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia de 01 digito', function(){
      expect(bankingGenerator(1).digitoAgencia.length).toEqual(1);
    });
    it('deve retornar uma conta de 08 digitos', function(){
      expect(bankingGenerator(1).conta.length).toEqual(8);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(1).digitoConta.length).toEqual(1);
    });
  });

  describe('Quando o código recebido for 33 (Santander)', function(){
	var tipos = ['01','02','03','05','07','09','13','27','35','37','43','45','46','48','50','53','60','92'];
	it('deve retornar o nome Santander', function(){
	  expect(bankingGenerator(33).nome).toEqual('Santander');
	});
	  
	it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(33).agencia.length).toEqual(4);
    });
    it('deve retornar digito de agencia em branco (vazio)', function(){
	  expect(bankingGenerator(33).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 8 digitos', function(){
      expect(bankingGenerator(33).conta.length).toEqual(8);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(33).digitoConta.length).toEqual(1);
    });
	
    it('Os dois primeiros digitos da conta indicam o tipo de conta', function(){
	  // Apesar deste teste não ser assertivo, ele deve ser mantido para efeito de documentação  
	  expect(tipos.indexOf(bankingGenerator(33).conta.substring(0,2)) > -1).toBeTruthy();
	});
	
	it('se não for informada uma lista com tipos de conta válidos deve ser utilizado um tipo aleatório da lista padrão',function(){
	  // Apesar deste teste não ser assertivo, ele deve ser mantido para efeito de documentação  
	  expect(tipos.indexOf(bankingGenerator(33).conta.substring(0,2)) > -1).toBeTruthy();
	});
	
	it('se for informada uma lista com tipos de conta válidos deve ser utilizado um tipo aleatório da lista informada',function(){
      var lista = ['99','98'];
	  expect(lista.indexOf(bankingGenerator(33, lista).conta.substring(0,2)) > -1).toBeTruthy();
	  expect(tipos.indexOf(bankingGenerator(33, lista).conta.substring(0,2)) > -1).toBeFalsy();
	});
	
  });

  describe('Quando o código recebido for 104 (Caixa)', function(){
	var tipos = ['001','002','003','006','007','013','022','023','037'];
	it('deve retornar o nome Caixa Econômica Federal', function(){
	  expect(bankingGenerator(104).nome).toEqual('Caixa Econômica Federal');
	});
	
	it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(104).agencia.length).toEqual(4);
    });
    it('deve retornar digito de agencia em branco (vazio)', function(){
	  expect(bankingGenerator(104).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 11 digitos', function(){
      expect(bankingGenerator(104).conta.length).toEqual(11);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(104).digitoConta.length).toEqual(1);
    });
	
    it('Os 03 primeiros digitos da conta indicam o tipo de conta', function(){
	  // Apesar deste teste não ser assertivo, ele deve ser mantido para efeito de documentação  
	  expect(tipos.indexOf(bankingGenerator(104).conta.substring(0,3)) > -1).toBeTruthy();
	});
	
	it('se não for informada uma lista com tipos de conta válidos deve ser utilizado um tipo aleatório da lista padrão',function(){
	  // Apesar deste teste não ser assertivo, ele deve ser mantido para efeito de documentação  
	  expect(tipos.indexOf(bankingGenerator(104).conta.substring(0,3)) > -1).toBeTruthy();
	});
	
	it('se for informada uma lista com tipos de conta válidos deve ser utilizado um tipo aleatório da lista informada',function(){
      var lista = ['099','098'];
	  expect(lista.indexOf(bankingGenerator(104, lista).conta.substring(0,3)) > -1).toBeTruthy();
	  expect(tipos.indexOf(bankingGenerator(104, lista).conta.substring(0,3)) > -1).toBeFalsy();
	});
  });

  describe('Quando o código recebido for 237 (Bradesco)', function(){
    it('deve retornar o nome Bradesco', function(){
      expect(bankingGenerator(237).nome).toEqual('Bradesco');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(237).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia de 01 digito', function(){
      expect(bankingGenerator(237).digitoAgencia.length).toEqual(1);
    });
    it('deve retornar uma conta de 07 digitos', function(){
      expect(bankingGenerator(237).conta.length).toEqual(7);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(237).digitoConta.length).toEqual(1);
    });
  });
  
  describe('Quando o código recebido for 341 (Itaú)', function(){
    it('deve retornar o nome Itaú', function(){
      expect(bankingGenerator(341).nome).toEqual('Itaú');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(341).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia em branco (vazio)', function(){
      expect(bankingGenerator(341).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 05 digitos', function(){
      expect(bankingGenerator(341).conta.length).toEqual(5);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(341).digitoConta.length).toEqual(1);
    });
  });
  
  describe('Quando o código recebido for 399 (HSBC)', function(){
    it('deve retornar o nome HSBC', function(){
      expect(bankingGenerator(399).nome).toEqual('HSBC');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(399).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia em branco (vazio)', function(){
      expect(bankingGenerator(399).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 05 digitos', function(){
      expect(bankingGenerator(399).conta.length).toEqual(5);
    });
    it('deve retornar um digito de conta de 02 digito', function(){
      expect(bankingGenerator(399).digitoConta.length).toEqual(2);
    });
  });
  
  describe('Quando o código recebido for 356 (Real)', function(){
    it('deve retornar o nome Banco Real', function(){
      expect(bankingGenerator(356).nome).toEqual('Banco Real');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(356).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia em branco (vazio)', function(){
      expect(bankingGenerator(356).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 07 digitos', function(){
      expect(bankingGenerator(356).conta.length).toEqual(7);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(356).digitoConta.length).toEqual(1);
    });
  });
  
  describe('Quando o código recebido for 745 (Citibank)', function(){
    it('deve retornar o nome Citibank', function(){
      expect(bankingGenerator(745).nome).toEqual('Citibank');
    });
    it('deve retornar uma agencia de 04 digitos', function(){
      expect(bankingGenerator(745).agencia.length).toEqual(4);
    });
    it('deve retornar um digito de agencia em branco (vazio)', function(){
      expect(bankingGenerator(745).digitoAgencia).toEqual('');
    });
    it('deve retornar uma conta de 10 digitos', function(){
      expect(bankingGenerator(745).conta.length).toEqual(10);
    });
    it('deve retornar um digito de conta de 01 digito', function(){
      expect(bankingGenerator(745).digitoConta.length).toEqual(1);
    });
  });
	  
});