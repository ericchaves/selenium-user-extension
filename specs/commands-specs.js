describe('Ao carregar user-exetentions.js', function(){
  it('deve ser adicionado o comando doTypeCPF ao prototipo do Selenium', function(){
    expect(typeof Selenium.prototype.doTypeCPF).toEqual('function');
  });

  it('deve ser adicionado o comando doTypeCreditCard ao prototipo do Selenium', function(){
    expect(typeof Selenium.prototype.doTypeCreditCard).toEqual('function');
  });

  it('deve ser adicionado o comando doStoreBankingAccount ao prototipo do Selenium', function(){
    expect(typeof Selenium.prototype.doStoreBankingAccount).toEqual('function');
  });

  describe('O comando doTypeCPF', function(){
    
    afterEach(function(){
      browserBot.reset();
    });

    it('localiza o elemento de destino através de um seletor (primeiro argumento)', function(){
      browserBot.doTypeCPF('//a/selector', true);
      expect(browserBot.findElement.calledWith('//a/selector')).toBeTruthy();
    });

    it('gerar um CPF com ou sem formatação (segundo argumento)', function(){
      var stub = sinon.stub(window, 'cpfGenerator');
      browserBot.doTypeCPF('//a/selector', true);
      stub.restore();
      expect(stub.calledWith(true)).toBeTruthy();
    });

    it('atribui o número de CPF ao valor/texto do elemento', function(){
      var stub = sinon.stub(window, 'cpfGenerator');
      var el = document.createElement('input');
      stub.returns('12345678901');
      browserBot.findElement.returns(el);
      browserBot.doTypeCPF('//a/selector', true);
      stub.restore();
      expect(browserBot.findElement.calledWith('//a/selector')).toBeTruthy();
      expect(browserBot.replaceText.calledWith(el, '12345678901')).toBeTruthy();
    });
  });

  describe('O comando doTypeCreditCard', function(){
    
    afterEach(function(){
      browserBot.reset();
    });

    it('localiza o elemento de destino através de um seletor (primeiro argumento)', function(){
      browserBot.doTypeCreditCard('//a/selector', true);
      expect(browserBot.findElement.calledWith('//a/selector')).toBeTruthy();
    });

    it('gerar um cartão de crédito para determinada bandeira (segundo argumento) ', function(){
      var stub = sinon.stub(window, 'creditCardGenerator');
      browserBot.doTypeCreditCard('//a/selector', 'VISA');
      stub.restore();
      expect(stub.calledWith('VISA')).toBeTruthy();
    });

    it('atribui o número de cartão ao valor/texto do elemento', function(){
      var stub = sinon.stub(window, 'creditCardGenerator');
      stub.returns('4567890123456789');
      var el = document.createElement('input');
      browserBot.findElement.returns(el);
      browserBot.doTypeCreditCard('//a/selector', 'VISA');
      stub.restore();
      expect(browserBot.findElement.calledWith('//a/selector')).toBeTruthy();
      expect(browserBot.replaceText.calledWith(el, '4567890123456789')).toBeTruthy();
    });
  });

  describe('o comando doStoreBankingAccount', function(){
    var banco = {
      agencia: '1234',
      digitoAgencia: '1',
      conta: '12345678',
      digitoConta: '1'
    }
    afterEach(function(){
      browserBot.reset();
    });

    it('recebe o número do banco (primeiro argumento)', function(){
      var bankId = '1';
      expect(function(){ browserBot.doStoreBankingAccount(bankId, 'contaTeste') }).not.toThrow();
    });

    it('recebe o número do banco e uma lista de tipos de conta separadas por dois pontos. As contas devem ser separadas por vírgula.', function(){
      var bankId = '1:00,01'
        , stub = sinon.stub(window, 'bankingGenerator');
      stub.returns(banco);

      browserBot.doStoreBankingAccount(bankId, 'contaTeste');
      expect(stub.calledWith('1',['00','01'])).toBeTruthy();
      stub.restore();
    });

    it('recebe um nome de variável (storedVars) para armazenar o resultado (segundo argumento)', function(){
      var bankId = '1'
      , stub = sinon.stub(window, 'bankingGenerator');
      stub.returns(banco);

      browserBot.doStoreBankingAccount(bankId, 'contaTeste');
      expect(storedVars['contaTeste']).toEqual(banco);
      stub.restore();
    });


  });

})