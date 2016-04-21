/*jslint browser: true, indent: 2*/
/*global stage,loader,createjs,calculaSkewPorta*/
var portas = [];
var posicoesPortas = {
  x: [32, 167, 488, 623],
  y: [5, 85, 413, 493]
};


// TODO: call callback
function abrePorta(idPorta, callback, silencioso) {
  'use strict';
  var finalSkewY = calculaSkewPorta(idPorta),
    porta = portas[idPorta];
  createjs.Tween.get(porta)
    .to({
      skewY: 0,
      scaleX: 1
    }, 0)
    .to({
      skewY: finalSkewY,
      scaleX: 0
    }, 300)
    .to({
      skewY: -finalSkewY
    }, 0)
    .to({
      scaleX: -0.2
    }, 100);
  if (!silencioso) {
    tocaAudio("porta-abrindo");
  }
}

function abreTodasAsPortas() {
  'use strict';
  var i;
  for (i = 0; i < portas.length; i += 1) {
    abrePorta(i, null, true);
  }
  tocaAudio("todas-portas-abrindo");
}

// TODO: call callback
function fechaPorta(idPorta, callback, silencioso) {
  'use strict';
  var finalSkewY = calculaSkewPorta(idPorta),
    porta = portas[idPorta];
  createjs.Tween.get(porta)
    .to({
      skewY: -finalSkewY,
      scaleX: 0
    }, 100)
    .to({
      skewY: finalSkewY
    }, 0)
    .to({
      skewY: 0,
      scaleX: 1
    }, 300);
  if (!silencioso) {
    tocaAudio("porta-fechando");
  }
}

function fechaTodasAsPortas() {
  'use strict';
  var i;
  for (i = 0; i < portas.length; i += 1) {
    fechaPorta(i, null, true);
  }
  tocaAudio("todas-portas-fechando");
}

function destacaPorta(idPorta) {
  'use strict';
  var i;
  for (i = 0; i < portas.length; i += 1) {
    portas[i].alpha = (i === idPorta ? 0.5 : 1.0);
  }
}

function inicializaPortas() {
  'use strict';
  // as portas de baixo devem ser desenhadas de baixo pra cima, pois na
  // animação de abrir porta, a imagem da porta de cima deve passar sobre
  // a imagem da porta de baixo.
  var j,
    i,
    porta,
    ordemPortas = [0, 1, 2, 3, 4, 5, 6, 7, 15, 14, 13, 12, 11, 10, 9, 8];
  for (j = 0; j < ordemPortas.length; j += 1) {
    i = ordemPortas[j];
    porta = new createjs.Bitmap(loader.getResult("porta"));
    stage.addChild(porta);

    porta.topleft = {
      x: 0,
      y: 0
    };
    porta.topleft.x = porta.x = posicoesPortas.x[i % 4];
    porta.topleft.y = porta.y = posicoesPortas.y[Math.floor(i / 4)];
    porta.topleft.width = porta.width = porta.getBounds().width;
    porta.topleft.height = porta.height = porta.getBounds().height;
    if (i % 2 === 1) {
      porta.regX = porta.width;
      porta.x += porta.getBounds().width;
    }
    porta.idObjeto = null;

    portas[i] = porta;
  }
}

function limpaTodasAsPortas() {
  'use strict';
  var i;
  for (i = 0; i < portas.length; i += 1) {
    portas[i].idObjeto = null;
  }
}

function calculaSkewPorta(idPorta) {
  'use strict';
  var finalSkewY = (idPorta < 8 ? -20 : 20);
  if (idPorta % 2 === 1) {
    finalSkewY = -finalSkewY;
  }
  return finalSkewY;
}