var objetos = [];
var qtdObjetosPosicionados = 0;

function qtdObjetosEmPortas() {
  var qtd = 0;
  for (var i = 0; i < objetos.length; i++) {
    if (objetos[i].idPorta != null) {
      qtd++;
    }
  }
  return qtd;
}

function soltaObjeto(evt) {
  // show back the cursor
  stage.canvas.style.cursor = "auto";

  // check para ver se estou arrastrando sobre uma porta
  var match=-1;
  for(i = 0; i < 16 ; i++){
    porta = portas[i];
   
    if( getIntersection(porta,evt.target.getTransformedBounds())){
      match=i;
      break;
    }
  }
  if(match!=-1 && portas[match].idObjeto == null){
    document.getElementById('box').innerText=i;
    moveObjetoParaPorta(evt.target, match);
  }
  else {
    onObjetoPosicionado(evt.target, null);
    createjs.Tween.get(evt.target).to(
        {x: evt.target.iniX,
         y: evt.target.iniY},
        300,
        createjs.Ease.getPowInOut(2));
  }  
}

function getIntersection(rect1,rect2) {
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}

function removeObjeto(objeto) {
  var idObjeto = objeto.idObjeto;
  var indice = objetos.indexOf(idObjeto);
  objetos.splice(indice, 1);
  stage.removeChild(objeto);
}

function removeTodosOsObjetos() {
  for (var i = objetos.length - 1; i >= 0; i--) {
    removeObjeto(objetos[i]);
  };
}

function adicionaObjeto(idObjeto, idPorta) {
  var objeto = new createjs.Bitmap(loader.getResult("objeto" + idObjeto));
  objeto.portaCerta = idPorta;
  objeto.idPorta = null;
  objeto.idObjeto = idObjeto;
  objeto.offX = 0;
  objeto.offY = 0;
  
  objeto.scaleX = objeto.scaleY = .5;
  objeto.x = objeto.iniX = 50 + (idObjeto * 50) % 700;
  objeto.y = objeto.iniY = 200 + 50 * (idObjeto % 2);

  objeto.on("mousedown", function(evt){
    this.parent.addChild(this);
    this.offX = this.x - evt.stageX;
    this.offY = this.y - evt.stageY;
  });

  objeto.on("pressmove", function(evt){
    stage.canvas.style.cursor = "none";
    this.x = evt.stageX + this.offX;
    this.y = evt.stageY + this.offY;
  });

  objeto.addEventListener("pressup", soltaObjeto);

  return objeto;
}

function todosOsObjetosForamPosicionados() {
  return qtdObjetosEmPortas() == qtdObjetosPorFase[faseAtual];  
}

function getPosicaoDoObjetoNaPorta(objeto, idPorta) {
  var porta = portas[idPorta];
  var portax = porta.topleftx + porta.getBounds().width / 2;
  var portay = porta.toplefty + porta.getBounds().height / 2;

  var finalx = portax - objeto.getBounds().width * objeto.scaleX / 2;
  var finaly = portay - objeto.getBounds().height * objeto.scaleY / 2;

  return {x: finalx, y: finaly};  
}

function moveObjetoParaPorta(objeto, idPorta) {
  var pos = getPosicaoDoObjetoNaPorta(objeto, idPorta);
  createjs.Tween.get(objeto).to(
      {x: pos.x,
       y: pos.y},
      300,
      createjs.Ease.getPowInOut(2));

  onObjetoPosicionado(objeto, i);
}

function animaObjeto(numFase, especificacao, numObjeto) {
  if (numObjeto >= especificacao.length) {
    encerraDemonstracao(numFase);
    return;
  }
  var registro = especificacao[numObjeto];

  var objeto = new createjs.Bitmap(loader.getResult("objeto" + registro.idObjeto));
  objetos.push(objeto);
  stage.addChild(objeto);
  objeto.scaleX = 0.5;
  objeto.scaleY = 0.5;
  var posFinal = getPosicaoDoObjetoNaPorta(objeto, registro.idPorta);

  objeto.x = (stage.canvas.width - objeto.getBounds().width) / 2;
  objeto.y = (stage.canvas.height - objeto.getBounds().height) / 2;
  objeto.scaleX = 1.0;
  objeto.scaleY = 1.0;

  createjs.Tween.get(objeto)
    .call(abrePorta, [registro.idPorta])
    .wait(500)
    .to({
        scaleX: 0.5,
        scaleY: 0.5,
        x: posFinal.x,
        y: posFinal.y},
        1000)
    .wait(100)
    .call(function() {stage.addChildAt(objeto, 1); })
    .call(fechaPorta, [registro.idPorta])
    .wait(400)
    .call(animaObjeto, [numFase, especificacao, numObjeto + 1]);
}

function onObjetoPosicionado(objeto, idPorta) {
  objeto.idPorta = idPorta;
  if (idPorta != null) {
    portas[idPorta].idObjeto = objeto.idObjeto;
    if (todosOsObjetosForamPosicionados()) {
      avancaFase();
    }
  }
}

function enviaObjetosParaOFundo() {
	for (var i = 0; i < objetos.length; i++) {
		stage.addChildAt(objetos[i], 1);
	}
}