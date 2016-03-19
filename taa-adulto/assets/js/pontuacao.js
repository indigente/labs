var pontuacao = [];

function criaPontuacaoFase(totalObjetos, objCerto, portaCerta, objCertoPortaCerta) {
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
	// objeto: portaCerta, idPorta, idObjeto

	var objCertoPortaCerta = 0;
	var objCerto = 0;
	var portaCerta = 0;

	var listaPortasCertas = {};
	for (var i = 0; i < objetos.length; i++) {
		var objeto = objetos[i];
		if (objeto.portaCerta !== null) {
			listaPortasCertas[objeto.portaCerta] = true;
		}
	}

	for (var i = 0; i < objetos.length; i++) {
		var objeto = objetos[i];

		if (objeto.idPorta !== null) {
			if (objeto.idPorta === objeto.portaCerta) {
				objCertoPortaCerta++;
			} else if (objeto.portaCerta !== null) {
				objCerto++;
			} else if (listaPortasCertas[objeto.idPorta]) {
				portaCerta++;
			}
		}
	}


	var pontuacaoFase = criaPontuacaoFase(objetos.length, objCerto, portaCerta, objCertoPortaCerta);

	pontuacao[numFase] = pontuacaoFase;

	console.log(pontuacaoFase);

	return pontuacaoFase;
}

/*
 * Indica, com base nas últimas pontuações do jogador,
 * se o jogo deve continuar.
 */
function deveContinuar() {
	if (pontuacao.length < 3) {
		return true;
	} else {
		var ultimasPontuacoes = pontuacao.slice(-3);

		if (ultimasPontuacoes[0].objCertoPortaCerta === 0
				&& ultimasPontuacoes[1].objCertoPortaCerta === 0
				&& ultimasPontuacoes[2].objCertoPortaCerta === 0) {
			return false;
		} else {
			return true;
		}
	}
}