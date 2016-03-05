var idioma = "pt"; // alternativa: en


function mudaIdioma(novoIdioma) {
	idioma = novoIdioma;
}

function escondeTudo() {
	$("#canvas").hide();
	$(".mensagem").hide();
}

function mostraTelaEmBranco() {
	escondeTudo();
	$(".mensagem.embranco").show();
	createjs.Ticker.setPaused(true);
}

function mostraMensagem(idMensagem) {
	escondeTudo();
	$(".mensagem." + idioma + "." + idMensagem).show();
	createjs.Ticker.setPaused(true);
}

function mostraJogo() {
	escondeTudo();
	$("#canvas").show();
	createjs.Ticker.setPaused(false);
}