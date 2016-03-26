var objetos = [];
var qtdObjetosPosicionados = 0;

function carregaBitmapDoObjeto(idObjeto) {
  var objeto = new createjs.Bitmap(loader.getResult("images")),
    coords = objetoCoords.frames["objeto" + idObjeto + ".png"].frame;
  objeto.sourceRect = new createjs.Rectangle(-coords.x, -coords.y, coords.w, coords.h);;
  return objeto;
}

function qtdObjetosEmPortas() {
  var qtd = 0;
  for (var i = 0; i < objetos.length; i++) {
    if (objetos[i].idPorta != null) {
      qtd++;
    }
  }
  return qtd;
}

// Retorna id da porta sob o objeto ou, se não existir, null.
function getPortaSobObjeto(objeto) {
  var porta = null;

  for (var i = 0; i < 16 ; i++){
    if (getIntersection(portas[i].topleft, objeto.getTransformedBounds())) {
      porta = i;
      break;
    }
  }
  return porta;
}

function soltaObjeto(evt) {
  destacaPorta(null);
  stage.canvas.style.cursor = "auto";

  var objeto = evt.target;
  var idPorta = getPortaSobObjeto(objeto);

  if (idPorta === null || idPorta < 0) {
    // soltou fora de qualquer porta
    moveObjetoParaCenario(objeto);
    adicionaBinding(objeto, null);
  } else if (idPorta === objeto.idPorta) {
    // soltou na mesma porta
    moveObjetoParaPorta(objeto, idPorta);
  } else if (portas[idPorta].idObjeto == null) {
    // soltou em uma porta vazia
    moveObjetoParaPorta(objeto, idPorta);
    adicionaBinding(objeto, idPorta);
  } else {
    // soltou em uma porta ocupada por outro objeto
    moveObjetoParaCenario(objeto);
  }

  if (todosOsObjetosForamPosicionados()) {
    avancaFase();
  }
}

function adicionaBinding(objeto, idPortaSobObjeto) {
  if (objeto.idPorta == idPortaSobObjeto) {
    return;
  }

  // remove binding da porta anterior
  if (objeto.idPorta != null) {
    portas[objeto.idPorta].idObjeto = null;
  }
  // adiciona binding da nova porta
  objeto.idPorta = idPortaSobObjeto;
  if (idPortaSobObjeto != null) {
    portas[idPortaSobObjeto].idObjeto = objeto.idObjeto;
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
  var objeto = carregaBitmapDoObjeto(idObjeto);
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
    var match = getPortaSobObjeto(evt.target);
    destacaPorta(match);
  });

  objeto.addEventListener("pressup", soltaObjeto);

  return objeto;
}

function todosOsObjetosForamPosicionados() {
  return qtdObjetosEmPortas() == qtdObjetosPorFase[faseAtual];  
}

function getPosicaoDoObjetoNaPorta(objeto, idPorta) {
  var porta = portas[idPorta];
  var portax = porta.topleft.x + porta.getBounds().width / 2;
  var portay = porta.topleft.y + porta.getBounds().height / 2;

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
}

function moveObjetoParaCenario(objeto) {
    createjs.Tween.get(objeto).to(
        {x: objeto.iniX,
         y: objeto.iniY},
        300,
        createjs.Ease.getPowInOut(2));
}

function animaObjeto(numFase, especificacao, numObjeto) {
  if (numObjeto >= especificacao.length) {
    encerraDemonstracao(numFase);
    return;
  }
  var registro = especificacao[numObjeto];

  var objeto = carregaBitmapDoObjeto(registro.idObjeto);
  objetos.push(objeto);
  stage.addChild(objeto);
  objeto.scaleX = 0.5;
  objeto.scaleY = 0.5;
  var posFinal = getPosicaoDoObjetoNaPorta(objeto, registro.idPorta);

  objeto.x = (stage.canvas.width - objeto.getBounds().width) / 2;
  objeto.y = (stage.canvas.height - objeto.getBounds().height) / 2 - 30;
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

function enviaObjetosParaOFundo() {
	for (var i = 0; i < objetos.length; i++) {
		stage.addChildAt(objetos[i], 1);
	}
}