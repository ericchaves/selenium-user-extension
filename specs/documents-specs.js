describe('Gerador de CPF', function(){
  it('deve expor a função cpfGenerator', function(){
    expect(cpfGenerator).toBeDefined();
  });

  it('retorna por padrão um CPF válido sem formatação', function(){
    expect(cpfGenerator()).toMatch(/^\d{11}$/)
  });

  it('aceita parâmetro para retornar um CPF válido com formatação', function(){
    expect(cpfGenerator(true)).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });
})