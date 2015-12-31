var portas = [];
var posicoesPortas = {
    x: [32, 167, 488, 623],
    y: [5, 85, 413, 493]
  };


// TODO: call callback
function abrePorta(idPorta, callback) {
  var finalSkewY = calculaSkewPorta(idPorta);
  var porta = portas[idPorta];
  createjs.Tween.get(porta)
    .to({skewY: 0, scaleX: 1}, 0)
    .to({skewY: finalSkewY, scaleX: 0}, 300)
    .to({skewY: -finalSkewY}, 0)
    .to({scaleX: -0.2}, 100);
}

// TODO: call callback
function fechaPorta(idPorta, callback) {
  var finalSkewY = calculaSkewPorta(idPorta);
  var porta = portas[idPorta];
  createjs.Tween.get(porta)
    .to({skewY: -finalSkewY, scaleX: 0}, 100)
    .to({skewY: finalSkewY}, 0)
    .to({skewY: 0, scaleX: 1}, 300);
}

function inicializaPortas() {
  // as portas de baixo devem ser desenhadas de baixo pra cima, pois na
  // animação de abrir porta, a imagem da porta de cima deve passar sobre
  // a imagem da porta de baixo.
  var ordemPortas = [0, 1, 2, 3, 4, 5, 6, 7, 15, 14, 13, 12, 11, 10, 9, 8];
  for (var j = 0; j < ordemPortas.length; j++) {
    var i = ordemPortas[j];
    var porta = new createjs.Bitmap(loader.getResult("porta"));
    stage.addChild(porta);

    porta.topleftx = porta.x = posicoesPortas.x[i%4];
    porta.toplefty = porta.y = posicoesPortas.y[Math.floor(i/4)];
    porta.width = porta.getBounds().width;
    porta.height = porta.getBounds().height;
    if (i % 2 == 1) {
      porta.regX = porta.width;
      porta.x += porta.getBounds().width;
    }
    porta.objeto =  null;

    portas[i] = porta;
  }
}

function limpaTodasAsPortas() {
  for (var i = 0; i < portas.length; i++) {
    portas[i].idObjeto = null;
  }
}

function calculaSkewPorta(idPorta) {
  var finalSkewY = (idPorta < 8 ? -20 : 20);
  if (idPorta % 2 == 1) {
    finalSkewY = -finalSkewY;
  }
  return finalSkewY;
}
