describe('Gerador de Cartões de Crédito', function(){
  it('deve expor a função creditCardGenerator', function(){
    expect(creditCardGenerator).toBeDefined();
  });

  it('gera cartões VISA por padrão (16 posções, sem pontos)', function(){
    expect(creditCardGenerator()).toMatch(/^4\d{15}$/);
  });

  it('gera cartões VISA quando a bandeira não é suportada', function(){
    expect(creditCardGenerator('OUTROS')).toMatch(/^4\d{15}$/);
  });
  
  it('gera cartões MASTERCARD (16 posções, sem pontos)', function(){
    expect(creditCardGenerator('MASTERCARD')).toMatch(/^5\d{15}$/);
  });

  it('gera cartões AMEX (15 posções, sem pontos)', function(){
    expect(creditCardGenerator('AMEX')).toMatch(/^3\d{14}$/);
  });

  it('gera cartões DISCOVER (15 posções, sem pontos)', function(){
    expect(creditCardGenerator('DISCOVER')).toMatch(/^6\d{15}$/);
  });
});