/*jslint browser: true, indent: 2*/
/*global createjs,loader,objetoCoords,portas,destacaPorta,stage*/

function carregaBitmapDoObjeto(idObjeto) {
  'use strict';
  var objeto = new createjs.Bitmap(loader.getResult("images")),
    coords = objetoCoords.frames["objeto" + idObjeto + ".png"].frame,
    hit;

  objeto.sourceRect = new createjs.Rectangle(-coords.x, -coords.y, coords.w, coords.h);

  hit = new createjs.Shape();
  hit.graphics.beginFill("#000").drawRect(0, 0, coords.w, coords.h);
  objeto.hitArea = hit;

  return objeto;
}

function getIntersection(rect1, rect2) {
  'use strict';
  if (rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y) {
    return false;
  }
  return true;
}

// Retorna id da porta sob o objeto ou, se não existir, null.
function getPortaSobObjeto(objeto) {
  'use strict';
  var i, porta = null;

  for (i = 0; i < 16; i += 1) {
    if (getIntersection(portas[i].topleft, objeto.getTransformedBounds())) {
      porta = i;
      break;
    }
  }
  return porta;
}

function adicionaBinding(objeto, idPortaSobObjeto) {
  'use strict';
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

function getPosicaoDoObjetoNaPorta(objeto, idPorta) {
  'use strict';
  var porta = portas[idPorta];
  var portax = porta.topleft.x + porta.getBounds().width / 2;
  var portay = porta.topleft.y + porta.getBounds().height / 2;

  var finalx = portax - objeto.getBounds().width * objeto.scaleX / 2;
  var finaly = portay - objeto.getBounds().height * objeto.scaleY / 2;

  return {
    x: finalx,
    y: finaly
  };
}

function moveObjetoParaPorta(objeto, idPorta) {
  'use strict';
  var pos = getPosicaoDoObjetoNaPorta(objeto, idPorta);
  createjs.Tween.get(objeto).to({
      x: pos.x,
      y: pos.y
    },
    300,
    createjs.Ease.getPowInOut(2));
}

function moveObjetoParaCenario(objeto) {
  'use strict';
  createjs.Tween.get(objeto).to({
      x: objeto.iniX,
      y: objeto.iniY
    },
    300,
    createjs.Ease.getPowInOut(2));
}
