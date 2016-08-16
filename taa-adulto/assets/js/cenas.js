/*jslint browser: true, indent: 2*/
/*global $,createjs*/

var idioma = "pt"; // alternativa: en


function mudaIdioma(novoIdioma) {
  'use strict';
  idioma = novoIdioma;
}

function escondeTudo() {
  'use strict';
  $("#canvas").hide();
  $(".mensagem").hide();
  $(".formulario").hide();
}

function mostraTelaEmBranco() {
  'use strict';
  escondeTudo();
  $(".mensagem.embranco").show();
  createjs.Ticker.setPaused(true);
}

function mostraMensagem(idMensagem) {
  'use strict';
  escondeTudo();
  $(".mensagem." + idioma + "." + idMensagem).show();
  createjs.Ticker.setPaused(true);
}

function mostraFormulario() {
  'use strict';
  escondeTudo();
  $(".formulario." + idioma).show();
  createjs.Ticker.setPaused(true);
}

function mostraJogo() {
  'use strict';
  escondeTudo();
  $("#canvas").show();
  createjs.Ticker.setPaused(false);
}

function validaForm(){
  'use strict';
  var valido=false;
  if((document.getElementById('nome').value).length>0)
    if(document.getElementById('sexo').value!="none")
      if(document.getElementById('nascimento').value!="")
        if(document.getElementById('escolaridade').value!="none")
          if(document.getElementById('local').value!="none")
            valido=true;
  if(valido)
    mostraJogo();
  else
    alert("Compilar todo o formulario!");
}

class Cena {
  constructor() {
    if (new.target === Cena) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }
  begin() {}
  end() {}
}

class CenaTextoFundoBranco extends Cena {
  constructor() {
    super();
    this.box = new createjs.Shape();
    this.box.graphics.beginFill('#ffffff');
    this.box.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    this.text = new createjs.Text(this.getMensagem(), this.getFont(), "#000");
  }
  getMensagem() {
    return 'placelholder message';
  }
  getFont() {
    return '50px Arial';
  }
  begin() {
    var bounds = this.text.getBounds();
    this.text.x = (stage.canvas.width - bounds.width) / 2;
    this.text.y = (stage.canvas.height - bounds.height) / 2;

    stage.addChild(this.box);
    stage.addChild(this.text);
  }
  end() {
    stage.removeChild(this.text);
    stage.removeChild(this.box);
  }
}

class CenaAtencao extends CenaTextoFundoBranco {
  getMensagem() {
    return 'Atenção!';
  }
}

class CenaSuaVez extends CenaTextoFundoBranco {
  getMensagem() {
    return 'Agora é sua vez!';
  }
}
