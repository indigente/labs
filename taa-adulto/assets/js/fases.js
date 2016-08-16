/*jslint browser: true, indent: 2*/
/*global $,RNG,stage,calculaPontuacaoFase,objetos,enviaObjetosParaOFundo,fechaTodasAsPortas,deveContinuar,removeTodosOsObjetos,limpaTodasAsPortas,abreTodasAsPortas,adicionaObjeto,mostraTelaEmBranco,mostraJogo,animaObjeto,mostraMensagem*/

var rng = new RNG(1); // random number generator
var faseAtual = 0; // de 0 a 17
var MAX_FASE = 8;
var qtdObjetosPorFase = [
  3, 3, 3,
  4, 4, 4,
  5, 5, 5
]; //,
// 6, 6, 6,
// 7, 7, 7,
// 8, 8, 8];

// O primeiro número é o *id* da porta (contado a partir de 1); o segundo é o *id* do objeto que vai ser colocado na porta, e o terceiro é o *id* de um outro objeto que vai aparecer no final só pra confundir.

var dadosFase = [
  11, 3, 10, //13
  1, 18, 27,
  6, 21, 25,
  10, 19, 39, //23
  13, 31, 11,
  15, 8, 38,
  9, 1, 29, //33
  12, 36, 23,
  7, 22, 40,
  3, 9, 30, //14
  14, 28, 37,
  2, 35, 34,
  16, 13, 26,
  8, 2, 24, //24
  5, 17, 4,
  4, 12, 32,
  7, 20, 16,
  16, 7, 6, //34
  3, 5, 14,
  1, 33, 15,
  5, 28, 34,
  12, 21, 10, //15
  10, 25, 5,
  11, 7, 35,
  6, 38, 14,
  13, 39, 13,
  2, 27, 30, //25
  4, 22, 17,
  8, 11, 8,
  14, 37, 23,
  9, 6, 12,
  15, 3, 20, //35
  10, 36, 32,
  11, 24, 31,
  8, 4, 34,
  3, 15, 9
]; // ,
// 5 , 19 , 26 , //16
// 14 , 2 , 29 ,
// 1 , 16 , 40 ,
// 6 , 1 , 18 ,
// 9 , 38 , 37 ,
// 2 , 39 , 3 ,
// 15 , 26 , 15 , //26
// 12 , 29 , 10 ,
// 4 , 12 , 20 ,
// 16 , 33 , 8 ,
// 13 , 31 , 18 ,
// 7 , 27 , 23 ,
// 16 , 21 , 14 , //36
// 8 , 28 , 1 ,
// 13 , 32 , 6 ,
// 15 , 7 , 2 ,
// 1 , 9 , 24 ,
// 5 , 13 , 11 ,
// 4 , 36 , 4 , //17
// 5 , 16 , 25 ,
// 6 , 17 , 34 ,
// 10 , 35 , 40 ,
// 12 , 30 , 22 ,
// 2 , 5 , 19 ,
// 9 , 39 , 20 ,
// 14 , 26 , 1 , //27
// 3 , 37 , 17 ,
// 11 , 25 , 32 ,
// 2 , 27 , 8 ,
// 7 , 18 , 2 ,
// 13 , 23 , 40 ,
// 15 , 34 , 11 ,
// 10 , 35 , 12 , //37
// 1 , 14 , 16 ,
// 6 , 30 , 10 ,
// 4 , 28 , 15 ,
// 8 , 31 , 5 ,
// 9 , 9 , 13 ,
// 12 , 33 , 29 ,
// 3 , 21 , 22 , //18
// 5 , 36 , 6 ,
// 14 , 24 , 38 ,
// 7 , 4 , 3 ,
// 16 , 7 , 19 ,
// 13 , 28 , 25 ,
// 12 , 32 , 22 ,
// 9 , 37 , 20 ,
// 2 , 21 , 5 , //28
// 5 , 15 , 14 ,
// 3 , 29 , 36 ,
// 1 , 11 , 23 ,
// 14 , 2 , 7 ,
// 4 , 17 , 18 ,
// 10 , 4 , 10 ,
// 6 , 31 , 12 ,
// 11 , 39 , 38 , //38
// 12 , 13 , 8 ,
// 7 , 40 , 19 ,
// 8 , 16 , 26 ,
// 15 , 24 , 34 ,
// 10 , 1 , 33 ,
// 9 , 9 , 6 ,
// 1 , 35 , 27];

function getEspecificacaoFase(numFase) {
  'use strict';
  var especificacao = [],
    indice = 0,
    i;

  indice = 0;
  for (i = 0; i < numFase; i += 1) {
    indice += qtdObjetosPorFase[i] * 3;
  }

  for (i = indice; i <= indice + 3 * (qtdObjetosPorFase[numFase] - 1); i += 3) {
    especificacao.push({
      idPorta: dadosFase[i] - 1,
      idObjeto: dadosFase[i + 1],
      idOutroObjeto: dadosFase[i + 2]
    });
  }

  return especificacao;
}

function demonstraFase(numFase) {
  'use strict';
//  qtdObjetosPosicionados = 0;
  removeTodosOsObjetos();
  limpaTodasAsPortas();

  var especificacao = getEspecificacaoFase(numFase);

  animaObjeto(numFase, especificacao, 0);
}

function gameOver() {
  'use strict';
  mostraMensagem("msgfim");
  // removeTodosOsObjetos();

  // var bg = new createjs.Shape();
  // bg.graphics.beginFill("#fff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  // stage.addChild(bg);

  // var text = new createjs.Text("Obrigado por participar!", "36px Arial", "#333");
  // text.textAlign = "center";
  // stage.addChild(text);
  // text.x = stage.canvas.width / 2;
  // text.y = stage.canvas.height / 2;
}

function enviaPontuacao(pontuacao) {
  'use strict';
  $.request('post', 'inserir.php', {trial1_3O: pontuacao.objCerto,
                        trial1_3L: pontuacao.portaCerta,
                        trial1_3OL: pontuacao.objCertoPortaCerta}).then(function (data) { console.log(data); });
}

function avancaFase() {
  'use strict';
  var tempoParaFecharPorta = 400,
    pontuacao = calculaPontuacaoFase(faseAtual, objetos);

  enviaPontuacao(pontuacao);

  setTimeout(function () {
    enviaObjetosParaOFundo();
    fechaTodasAsPortas();
    faseAtual += 1;
    if (faseAtual <= MAX_FASE && deveContinuar()) {
      setTimeout(function () { mostraMensagem('attention'); }, 1000);
      setTimeout(function () { mostraJogo(); demonstraFase(faseAtual); }, 3000);
    } else {
      gameOver();
    }
  }, tempoParaFecharPorta);
}

function embaralhaObjetos() {
  'use strict';
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
      j = Math.floor(rng.uniform() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  shuffle(objetos);
}

function definePosicaoInicialDosObjetos() {
  'use strict';
  var center = {
      x: stage.canvas.width / 2,
      y: stage.canvas.height / 2
    },
    semiwidth = 50,
    semiheight = 40,
    ncols = objetos.length / 2,
    x1 = center.x - ((ncols - 1) * semiwidth),
    y1 = center.y - semiheight - 30,
    objeto,
    i;

  for (i = 0; i < ncols; i += 1) {
    objeto = objetos[i];
    objeto.x = objeto.iniX = x1 + (i * semiwidth * 2) - (objeto.getBounds().width / 4);
    objeto.y = objeto.iniY = y1 - (objeto.getBounds().height / 4);

    objeto = objetos[ncols + i];
    objeto.x = objeto.iniX = x1 + (i * semiwidth * 2) - (objeto.getBounds().width / 4);
    objeto.y = objeto.iniY = y1 + 2 * semiheight - (objeto.getBounds().height / 4);
  }
}

// numFase: de 0 a 17
function carregaFase(numFase) {
  'use strict';
  var i, especificacao, registro, objeto, outro;
//  qtdObjetosPosicionados = 0;
  removeTodosOsObjetos();
  limpaTodasAsPortas();
  abreTodasAsPortas();

  especificacao = getEspecificacaoFase(numFase);
  for (i = 0; i < especificacao.length; i += 1) {
    registro = especificacao[i];

    objeto = adicionaObjeto(registro.idObjeto, registro.idPorta);
    outro = adicionaObjeto(registro.idOutroObjeto, null);
    objetos.push(objeto);
    objetos.push(outro);
  }

  embaralhaObjetos();
  definePosicaoInicialDosObjetos();

  for (i = 0; i < objetos.length; i += 1) {
    stage.addChild(objetos[i]);
  }
}

function encerraDemonstracao(numFase) {
  'use strict';
  setTimeout(function () {
    mostraTelaEmBranco();
  }, 500);
  setTimeout(function () {
    mostraJogo();
    carregaFase(numFase);
  }, 1500);
}
