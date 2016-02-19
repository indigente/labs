var pontuacao = [];

function criaPontuacaoFase(totalObjetos, matchesPerfeitos) {
	var p = {};
	p.totalObjetos = totalObjetos;
	p.matchesPerfeitos = matchesPerfeitos;
	return p;
}

/*
 * Dada a especificação de uma fase, retornada pela função
 * getEspecificacaoFase(i), e a lista de objetos posicionados,
 * pelo jogador, determina quantos pontos o jogador fez.
 */
function calculaPontuacaoFase(numFase, objetos) {
	// objeto: portaCerta, idPorta, idObjeto

	var qtdMatchesPerfeitos = 0;
	for (var i = 0; i < objetos.length; i++) {
		var objeto = objetos[i];

		if (objeto.idPorta !== null && objeto.idPorta === objeto.portaCerta) {
			qtdMatchesPerfeitos++;
		}
	}

	var pontuacaoFase = criaPontuacaoFase(objetos.length, qtdMatchesPerfeitos);
	pontuacao[numFase] = pontuacaoFase;

	console.log(pontuacao);

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

		if (ultimasPontuacoes[0].matchesPerfeitos === 0
				&& ultimasPontuacoes[1].matchesPerfeitos === 0
				&& ultimasPontuacoes[2].matchesPerfeitos === 0) {
			return false;
		} else {
			return true;
		}
	}
}