/*jslint browser: true, indent: 2*/
/*global console*/

var pontuacao = [];

function criaPontuacaoFase(totalObjetos, objCerto, portaCerta, objCertoPortaCerta) {
  'use strict';
  var p = {};
  p.totalObjetos = totalObjetos;
  p.objCerto = objCerto;
  p.portaCerta = portaCerta;
  p.objCertoPortaCerta = objCertoPortaCerta;
  return p;
}

/*
 * Dada a especificação de uma fase, retornada pela função
 * getEspecificacaoFase(i), e a lista de objetos posicionados,
 * pelo jogador, determina quantos pontos o jogador fez.
 */
function calculaPontuacaoFase(numFase, objetos) {
  'use strict';
  // objeto: portaCerta, idPorta, idObjeto

  var objCertoPortaCerta = 0,
    objCerto = 0,
    portaCerta = 0,
    listaPortasCertas = {},
    objeto,
    i,
    pontuacaoFase;

  for (i = 0; i < objetos.length; i += 1) {
    objeto = objetos[i];
    if (objeto.portaCerta !== null) {
      listaPortasCertas[objeto.portaCerta] = true;
    }
  }

  for (i = 0; i < objetos.length; i += 1) {
    objeto = objetos[i];

    if (objeto.idPorta !== null) {
      if (objeto.idPorta === objeto.portaCerta) {
        objCertoPortaCerta += 1;
      } else {
        if (objeto.portaCerta !== null) {
          objCerto += 1;
        }
        if (listaPortasCertas[objeto.idPorta]) {
          portaCerta += 1;
        }
      }
    }
  }


  pontuacaoFase = criaPontuacaoFase(objetos.length, objCerto, portaCerta, objCertoPortaCerta);

  pontuacao[numFase] = pontuacaoFase;

  console.log(pontuacaoFase);

  return pontuacaoFase;
}

/*
 * Indica, com base nas últimas pontuações do jogador,
 * se o jogo deve continuar.
 */
function deveContinuar() {
  'use strict';
  if (pontuacao.length < 3) {
    return true;
  } else {
    var ultimasPontuacoes = pontuacao.slice(-3);

    if (ultimasPontuacoes[0].objCertoPortaCerta === 0 &&
        ultimasPontuacoes[1].objCertoPortaCerta === 0 &&
        ultimasPontuacoes[2].objCertoPortaCerta === 0) {
      return false;
    } else {
      return true;
    }
  }
}

function pontuacaoFaseAgregada(p) {
  return p === undefined ? 0 : (p.objCertoPortaCerta + (0.25 * p.objCerto) + (0.25 * p.portaCerta));
}

function pontuacaoAgregada() {
  return pontuacao.length === 0 ? 0 : pontuacao.map(p => pontuacaoFaseAgregada(p)).reduce((a, b) => a + b, 0);
}

function pontuacaoArray() {
  var array = pontuacao.map(p => [p.totalObjetos, p.objCertoPortaCerta, p.objCerto, p.portaCerta]);
  array = [].concat.apply([], array)
  return array;
}
function pontuacaoTsv() {
  return pontuacaoArray().join("\t");
}
