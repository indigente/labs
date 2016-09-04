/*jslint browser: true, indent: 2*/
/*global $,RNG,stage,calculaPontuacaoFase,objetos,enviaObjetosParaOFundo,fechaTodasAsPortas,deveContinuar,removeTodosOsObjetos,limpaTodasAsPortas,abreTodasAsPortas,adicionaObjeto,mostraTelaEmBranco,mostraJogo,animaObjeto,mostraMensagem*/
var PARAMS = {
  tempoDemoAposFecharUltimaPorta: 500,
  tempoDemoTelaBranco: 1000,
  tempoTentativaAposFecharUltimaPorta: 1000,
  tempoTentativaMensagemAtencao: 2000,
  tempoParaFecharPorta: 400, /* apos posicionar ultimo objeto */
}

// // O primeiro número é o *id* da porta (contado a partir de 1);
// // o segundo é o *id* do objeto que vai ser colocado na porta,
// // e o terceiro é o *id* de um outro objeto que vai aparecer no final só pra confundir.
//
// var dadosFase = [
//   1 , 39 , 38 , // tutorial (38)
//   2 , 13 , 8 ,
//   11, 3, 10, //13
//   1, 18, 27,
//   6, 21, 25,
//   10, 19, 39, //23
//   13, 31, 11,
//   15, 8, 38,
//   9, 1, 29, //33
//   12, 36, 23,
//   7, 22, 40,
//   3, 9, 30, //14
//   14, 28, 37,
//   2, 35, 34,
//   16, 13, 26,
//   8, 2, 24, //24
//   5, 17, 4,
//   4, 12, 32,
//   7, 20, 16,
//   16, 7, 6, //34
//   3, 5, 14,
//   1, 33, 15,
//   5, 28, 34,
//   12, 21, 10, //15
//   10, 25, 5,
//   11, 7, 35,
//   6, 38, 14,
//   13, 39, 13,
//   2, 27, 30, //25
//   4, 22, 17,
//   8, 11, 8,
//   14, 37, 23,
//   9, 6, 12,
//   15, 3, 20, //35
//   10, 36, 32,
//   11, 24, 31,
//   8, 4, 34,
//   3, 15, 9
// ]; // ,
// // 5 , 19 , 26 , //16
// // 14 , 2 , 29 ,
// // 1 , 16 , 40 ,
// // 6 , 1 , 18 ,
// // 9 , 38 , 37 ,
// // 2 , 39 , 3 ,
// // 15 , 26 , 15 , //26
// // 12 , 29 , 10 ,
// // 4 , 12 , 20 ,
// // 16 , 33 , 8 ,
// // 13 , 31 , 18 ,
// // 7 , 27 , 23 ,
// // 16 , 21 , 14 , //36
// // 8 , 28 , 1 ,
// // 13 , 32 , 6 ,
// // 15 , 7 , 2 ,
// // 1 , 9 , 24 ,
// // 5 , 13 , 11 ,
// // 4 , 36 , 4 , //17
// // 5 , 16 , 25 ,
// // 6 , 17 , 34 ,
// // 10 , 35 , 40 ,
// // 12 , 30 , 22 ,
// // 2 , 5 , 19 ,
// // 9 , 39 , 20 ,
// // 14 , 26 , 1 , //27
// // 3 , 37 , 17 ,
// // 11 , 25 , 32 ,
// // 2 , 27 , 8 ,
// // 7 , 18 , 2 ,
// // 13 , 23 , 40 ,
// // 15 , 34 , 11 ,
// // 10 , 35 , 12 , //37
// // 1 , 14 , 16 ,
// // 6 , 30 , 10 ,
// // 4 , 28 , 15 ,
// // 8 , 31 , 5 ,
// // 9 , 9 , 13 ,
// // 12 , 33 , 29 ,
// // 3 , 21 , 22 , //18
// // 5 , 36 , 6 ,
// // 14 , 24 , 38 ,
// // 7 , 4 , 3 ,
// // 16 , 7 , 19 ,
// // 13 , 28 , 25 ,
// // 12 , 32 , 22 ,
// // 9 , 37 , 20 ,
// // 2 , 21 , 5 , //28
// // 5 , 15 , 14 ,
// // 3 , 29 , 36 ,
// // 1 , 11 , 23 ,
// // 14 , 2 , 7 ,
// // 4 , 17 , 18 ,
// // 10 , 4 , 10 ,
// // 6 , 31 , 12 ,
// // 11 , 39 , 38 , //38
// // 12 , 13 , 8 ,
// // 7 , 40 , 19 ,
// // 8 , 16 , 26 ,
// // 15 , 24 , 34 ,
// // 10 , 1 , 33 ,
// // 9 , 9 , 6 ,
// // 1 , 35 , 27];
