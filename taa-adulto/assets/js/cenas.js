/*jslint browser: true, indent: 2*/
/*global $,createjs*/

var idioma = "pt"; // alternativa: en

dadosUsuario = {};

function dadosUsuarioTsv() {
  var x = dadosUsuario;
  return '' + x['id'] + '\t' + JSON.stringify(x);
  // return `${x.nome}\t${x.sexo}\t${x.nascimento}\t${x.escolaridade}\t${x.local}`;
}

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

  var partida = new Partida();
  partida.inicia();
  createjs.Ticker.setPaused(false);
}

function valueForName(name) {
  var selector = '.formulario.' + idioma + ' [name="' + name + '"]';
  return $(selector).get('value');
};

function validaForm(){
  'use strict';
  var valido=false;

  dadosUsuario.nome = valueForName('nome');
  dadosUsuario.sexo = valueForName('sexo');
  dadosUsuario.nascimento = valueForName('nascimento');
  dadosUsuario.escolaridade = valueForName('escolaridade');
  dadosUsuario.local = valueForName('local');

  valido = dadosUsuario.nome.length > 0 &&
      dadosUsuario.sexo !== "none" &&
      dadosUsuario.nascimento !== "" &&
      dadosUsuario.escolaridade !== "none" &&
      dadosUsuario.local !== "none";

  if (valido) {
    mostraJogo();
  }
  else
    alert(_l("msg-complete-form"));
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

function criaBotao(rotulo, onclick, font, bgcolor) {
  var container = new createjs.Container(),
      text = new createjs.Text(rotulo, font || '50px Arial', "#000"),
      box = new createjs.Shape(),
      paddingWidth = 9,
      paddingHeight = 3;

  box.graphics.beginFill(bgcolor || '#ffffff');
  box.graphics.drawRect(0, 0,
      text.getBounds().width + 2 * paddingWidth,
      text.getBounds().height + 2 * paddingHeight);

  box.name = 'box';
  text.name = 'text';
  container.addChild(box);
  container.addChild(text);
  text.x = paddingWidth;
  if (onclick !== undefined) {
    container.on('click', onclick);
  }

  return container;
}

class CenaConfirmarCorrigir extends Cena {
  constructor(fnConfirmar, fnCorrigir) {
    super();

    var that;
    this.fnConfirmar = fnConfirmar;
    this.fnCorrigir = fnCorrigir;

    that = this;
    this.btnConfirmar = criaBotao(_l('btn-confirm'), function () {
      that.end();
      that.fnConfirmar();
    });
    this.btnCorrigir = criaBotao(_l('btn-correct'), function () {
      that.end();
      that.fnCorrigir();
    });
    this.boxDark = new createjs.Shape();
    this.boxDark.graphics.beginFill('rgba(0, 0, 0, 0.5)');
    this.boxDark.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    this.iniciou = false;
  }

  begin() {
    if (!this.iniciou) {
      this.iniciou = true;

      this.btnConfirmar.x = 500;
      this.btnConfirmar.y = 250;

      this.btnCorrigir.x = 300;
      this.btnCorrigir.y = this.btnConfirmar.y;

      stage.addChild(this.boxDark);
      stage.addChild(this.btnConfirmar);
      stage.addChild(this.btnCorrigir);
    }
  }

  end() {
    if (this.iniciou) {
      this.iniciou = false;
      stage.removeChild(this.btnCorrigir);
      stage.removeChild(this.btnConfirmar);
      stage.removeChild(this.boxDark);
    }
  }
}

class CenaInstrucoes extends Cena {
  constructor(texto, fnConfirmar) {
    super();

    this.x = 200;
    this.y = 350;
    this.width = 400;
    this.height = 230;

    this.fnConfirmar = fnConfirmar;
    this.box = new createjs.Shape();
    this.box.graphics.beginFill('#ffffff');
    this.box.graphics.drawRect(this.x, this.y, this.width, this.height);
    this.text = new createjs.Text(texto, '25px Arial', "#000");
    this.text.lineWidth = 350;
    this.text.x = 225;
    this.text.y = 375;
    var that = this;
    this.button = criaBotao(_l('msg-ok'), function () {
      that.end();
      that.fnConfirmar();
    }, '25px Arial', '#cccccc');
    this.button.x = this.x + this.width - 25 - this.button.getBounds().width;
    this.button.y = this.y + this.height - 25 - this.button.getBounds().height;
  }

  begin() {
    stage.addChild(this.box);
    stage.addChild(this.text);
    stage.addChild(this.button);
  }

  end() {
    stage.removeChild(this.button);
    stage.removeChild(this.text);
    stage.removeChild(this.box);
  }
}

class CenaTextoFundoBranco extends Cena {
  constructor(mensagem) {
    super();
    this.box = new createjs.Shape();
    this.box.graphics.beginFill('#ffffff');
    this.box.graphics.drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    this.text = new createjs.Text(mensagem || '', this.getFont(), "#000");
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
  constructor() {
    super(_l('msg-attention'));
  }
}

class CenaSuaVez extends CenaTextoFundoBranco {
  constructor() {
    super(_l("msg-your-turn"));
  }
}

class CenaGameOver extends CenaTextoFundoBranco {
  constructor(porcentagem) {
    super(_l("msg-thank-you") + porcentagem.toFixed(0) + "%");
    this.button = criaBotao('info', this.mostraInfo.bind(this), '12px Arial');
    this.button.x = 10;
    this.button.y = 10;
  }

  mostraInfo() {
    var tsv = `${dadosUsuarioTsv()}\t${pontuacaoTsv()}`;
    window.prompt(_l("msg+ctrl+c"), tsv);
  }

  begin() {
    super.begin();
    stage.addChild(this.button);
  }

  end() {
    stage.removeChild(this.button);
    super.end();
  }
}
