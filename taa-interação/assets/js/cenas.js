var idioma = "pt"; // alternativa: en


function mudaIdioma(novoIdioma) {
	idioma = novoIdioma;
}

function mostraTelaEmBranco() {
	$("#canvas").hide();
	$(".mensagem.embranco").show();
	createjs.Ticker.setPaused(true);
}

function mostraMensagem(idMensagem) {
	$("#canvas").hide();
	$(".mensagem." + idioma + "." + idMensagem).show();
	createjs.Ticker.setPaused(true);
}

function mostraJogo() {
	$(".mensagem").hide();
	$("#canvas").show();
	createjs.Ticker.setPaused(false);
}