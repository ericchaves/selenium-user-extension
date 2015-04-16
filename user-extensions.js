/* 
  selenium Commands 
*/
Selenium.prototype.doTypeCPF = function(locator, text) {
  var CPF = cpfGenerator(text);
  var element = this.page().findElement(locator);
  this.page().replaceText(element, CPF);
}

Selenium.prototype.doTypeCreditCard = function(locator, brand) {
  var t = creditCardGenerator(brand);
  var element = this.page().findElement(locator);
  this.page().replaceText(element, t);
}

Selenium.prototype.doStoreBankingAccount = function(bank, variable) {
  
  var params = bank.split(':')
    , bankId = params[0]
    , tipos = (params[1] ? params[1].split(',') : undefined)
    , banco = bankingGenerator(bankId, tipos);

  if (variable){
    storedVars[variable] = banco;
  }
}

Selenium.prototype.doTypeStoredAgencia = function(locator, variable) {
  var t = storedVars[variable];
  var element = this.page().findElement(locator);
  this.page().replaceText(element, t.agencia);
}

Selenium.prototype.doTypeStoredDigitoAgencia = function(locator, variable) {
  var t = storedVars[variable];
  var element = this.page().findElement(locator);
  this.page().replaceText(element, t.digitoAgencia);
}

Selenium.prototype.doTypeStoredConta = function(locator, variable) {
  var t = storedVars[variable];
  var element = this.page().findElement(locator);
  this.page().replaceText(element, t.conta);
}

Selenium.prototype.doTypeStoredDigitoConta = function(locator, variable) {
  var t = storedVars[variable];
  var element = this.page().findElement(locator);
  this.page().replaceText(element, t.digitoConta);
}

/*
  Helper functions
*/
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function bankingMod11(pesos, numero){
  var mod = pesos.reduce(function(previous, peso, idx){
    return previous += (parseInt(numero[idx]) * peso)
  }, 0);
  return 11 - (mod % 11);
};

function randomFixedInteger(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1)).toString();
}

function bankingGenerator(bankId, tipos){
  if ('string' === typeof bankId)
    bankId = parseInt(bankId);
  if ('number' !== typeof bankId)
    throw new Error('Número do banco é obrigatório.');
  var bancos = {
      1: 'Banco do Brasil',
     33: 'Santander',
    104: 'Caixa Econômica Federal',
    237: 'Bradesco',
    341: 'Itaú',
    356: 'Banco Real',
    399: 'HSBC',
    745: 'Citibank'
    }, result = {
      agencia: '',
      digitoAgencia: '',  
      conta: '',
      digitoConta: '',
      banco: bankId, 
      nome: ''
    };

  if (!bancos[bankId])
    throw new Error('Banco ' + bankId +' não suportado.');
  
  result.nome = bancos[bankId];

  if(bankId == 1){
    result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(8);

    [bankingMod11([5,4,3,2],  result.agencia), bankingMod11([9,8,7,6,5,4,3,2],  result.conta)].map(function(dv, idx){

      switch(dv){
        case 10:
          result[idx == 0 ? 'digitoAgencia' : 'digitoConta'] = 'X';
          break;
        case 11:
          result[idx == 0 ? 'digitoAgencia' : 'digitoConta'] = '0';
          break;
        default:
          result[idx == 0 ? 'digitoAgencia' : 'digitoConta'] = dv.toString();
          break;
      }
    });
  };
  
  if(bankId == 33){
    tipos = (tipos && tipos.unshift && tipos.length > 0) ? tipos : ['01','02','03','05','07','09','13','27','35','37','43','45','46','48','50','53','60','92'];
    result.agencia = randomFixedInteger(4);
    result.conta = tipos.randomElement() + randomFixedInteger(6);
    result.digitoAgencia = '';
    
    var ref = result.agencia + '00' + result.conta;
    var dv = [9,7,3,1,0,0,9,7,1,3,1,9,7,3].reduce(function(val, peso, idx){
      return val += ((peso * parseInt(ref[idx])) % 10);
    },0);

    result.digitoConta = (10 - (dv%10 == 0 ? 10 : dv%10)).toString();
  }
  
  if(bankId == 104){
    tipos = (tipos && tipos.unshift && tipos.length > 0) ? tipos : ['001','002','003','006','007','013','022','023','037'];
    result.agencia = randomFixedInteger(4);
    result.conta = tipos.randomElement() + randomFixedInteger(8);
    result.digitoAgencia = '';
  
    var ref = result.agencia + result.conta;
    var mod = [8,7,6,5,4,3,2,9,8,7,6,5,4,3,2].reduce(function(previous, peso, idx){
      return previous += (parseInt(ref[idx]) * peso)
      }, 0) * 10;
    mod = mod - (Math.floor(mod/11) * 11);
    result.digitoConta = mod == 10 ? '0' : mod.toString();
    
  };

  if(bankId == 237){
    result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(7);
  
    var dv = bankingMod11([5,4,3,2],  result.agencia);
    switch(dv){
          case 10:
            result.digitoAgencia = 'P';
            break;
          case 11:
            result.digitoAgencia = '0';
            break;
          default:
            result.digitoAgencia = dv.toString();
            break;
      };
  
    dv = [2,7,6,5,4,3,2].reduce(function(previous, peso, idx){
      return previous += (parseInt(result.conta[idx]) * peso)
      }, 0) % 11;

    switch(dv){
      case 0:
        result.digitoConta = '0';
        break;
      case 1:
        result.digitoConta = 'P';
        break;
      default:
        result.digitoConta = (11 - dv).toString() ;
        break;
    };
  };
  
  if(bankId == 341){
    result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(5);
    result.digitoAgencia = '';
    
    var ref = result.agencia + result.conta;
    var dv = [2,1,2,1,2,1,2,1,2].reduce(function(previous, peso, idx){
    var p = parseInt(ref[idx]) * peso;
      return previous += (p > 9 ?  (p % 10) + 1 : p);
    },0);
    result.digitoConta = dv % 10 == 0 ? '0' : (10 - (dv % 10)).toString();
  };
    
  if(bankId == 399){
      result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(6);
    result.digitoAgencia = '';
    
    var ref = result.agencia + result.conta;
    var dv = [8,9,2,3,4,5,6,7,8,9].reduce(function(previous, peso, idx){
      return previous += parseInt(ref[idx]) * peso;
    },0);
    
    result.digitoConta = [result.conta[5] , (dv % 11 == 0 || dv % 11 == 10) ? '0' : (dv % 11).toString()].join('');
    result.conta = result.conta.substring(0,5);
  }
  
  if(bankId == 356){
    result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(7);
    result.digitoAgencia = '';

    var ref = result.agencia + result.conta;
    var dv = [8,1,4,7,2,2,5,9,3,9,5].reduce(function(previous, peso, idx){
      return previous += parseInt(ref[idx]) * peso;
    },0);
    
    switch(dv % 11){
    case 0:
      result.digitoConta = '1';
      break;
    case 1:
      result.digitoConta = '0';
      break;
    default:
      result.digitoConta = (11 - (dv % 11)).toString();
      break;
    }
  };
  
  if(bankId == 745){
    result.agencia = randomFixedInteger(4);
    result.conta = randomFixedInteger(10);
    result.digitoAgencia = '';
  
    var dv = [11,10,9,8,7,6,5,4,3,2].reduce(function(previous, peso, idx){
      return previous += parseInt(result.conta[idx]) * peso;
    },0);
    
    result.digitoConta = (dv % 11) > 1 ? (11 - (dv % 11)).toString() : '0';
  };
  
  // if(bankId == 33){
    // result.agencia = '0189';
  // result.conta = '01017417';
  // result.digitoAgencia = '';
  // result.digitoConta = '9';
  // }
  //console.log(result);
  return result;
}

function cpfGenerator(masked){
  masked = masked || false; // TRUE para ativar e FALSE para desativar a pontuação.

  function randomiza(n) {
    var ranNum = Math.round(Math.random()*n);
    return ranNum;
  }

  function mod(dividendo,divisor) {
    return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
  }

  var n = 9;
  var n1 = randomiza(n);
  var n2 = randomiza(n);
  var n3 = randomiza(n);
  var n4 = randomiza(n);
  var n5 = randomiza(n);
  var n6 = randomiza(n);
  var n7 = randomiza(n);
  var n8 = randomiza(n);
  var n9 = randomiza(n);
  var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
  d1 = 11 - ( mod(d1,11) );
  if (d1>=10) d1 = 0;
  var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
  d2 = 11 - ( mod(d2,11) );
  if (d2>=10) d2 = 0;
  retorno = '';
  if (masked) cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
  else cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
  
  return cpf;
}

function creditCardGenerator(brand){
  var pos;
  var str = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sum = 0;
  var final_digit = 0;
  var t = 0;
  var len_offset = 0;
  var len = 0;
  var issuer;
 
  //
  // Fill in the first values of the string based with the specified bank's prefix.
  //
 
  // Mastercard
  if (brand == 'MASTERCARD') {
    str[0] = 5;
    t = Math.floor(Math.random() * 5) % 5;
    str[1] = 1 + t;   // Between 1 and 5.
    pos = 2;
    len = 16;
  }
  // American Express
  else if (brand == 'AMEX') {
    str[0] = 3;
    t = Math.floor(Math.random() * 4) % 4;
    str[1] = 4 + t;   // Between 4 and 7.
    pos = 2;
    len = 15;
  }
  // Discover
  else if (brand == 'DISCOVER') {
    str[0] = 6;
    str[1] = 0;
    str[2] = 1;
    str[3] = 1;
    pos = 4;
    len = 16;
  }else // Defaults Visa
  {
    str[0] = 4;
    pos = 1;
    len = 16;
  }
 
  //
  // Fill all the remaining numbers except for the last one with random values.
  //
 
  while (pos < len - 1) {
    str[pos++] = Math.floor(Math.random() * 10) % 10;
  }
 
  //
  // Calculate the Luhn checksum of the values thus far.
  //
 
  len_offset = (len + 1) % 2;
  for (pos = 0; pos < len - 1; pos++) {
    if ((pos + len_offset) % 2) {
      t = str[pos] * 2;
      if (t > 9) {
        t -= 9;
      }
      sum += t;
    }
    else {
      sum += str[pos];
    }
  }
 
  //
  // Choose the last digit so that it causes the entire string to pass the checksum.
  //
 
  final_digit = (10 - (sum % 10)) % 10;
  str[len - 1] = final_digit;
 
  // Output the CC value.
  t = str.join('');
  t = t.substr(0, len);
  return t;
}

