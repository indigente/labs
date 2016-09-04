var especificacoesFase = [
  [1 , 39 , 38 , // tutorial (38)
  2 , 13 , 8] ,

  [11, 3, 10, //13
  1, 18, 27,
  6, 21, 25],

  [10, 19, 39, //23
  13, 31, 11,
  15, 8, 38],

  [9, 1, 29, //33
  12, 36, 23,
  7, 22, 40],

  [3, 9, 30, //14
  14, 28, 37,
  2, 35, 34,
  16, 13, 26],

  [8, 2, 24, //24
  5, 17, 4,
  4, 12, 32,
  7, 20, 16],

  [16, 7, 6, //34
  3, 5, 14,
  1, 33, 15,
  5, 28, 34],

  [12, 21, 10, //15
  10, 25, 5,
  11, 7, 35,
  6, 38, 14,
  13, 39, 13],

  [2, 27, 30, //25
  4, 22, 17,
  8, 11, 8,
  14, 37, 23,
  9, 6, 12],

  [15, 3, 20, //35
  10, 36, 32,
  11, 24, 31,
  8, 4, 34,
  3, 15, 9]
]; // ,

class Notifier {
  constructor() {
    this.listeners = [];
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeListener(fn) {
    this.listeners.remove(fn);
  }

  notify(args) {
    var i;
    for (i = 0; i < this.listeners.length; i++) {
      this.listeners[i](args);
    }
  }
}

class CenaDemonstracaoFase extends Cena {
  constructor(objetosCertos, ehTutorial) {
    super();
    this.objetosCertos = objetosCertos;
    this.ehTutorial = ehTutorial;
    this.quandoFinalizar = new Notifier();
  }

  begin() {
    var that = this,
        cenaAtencao = new CenaAtencao();
    cenaAtencao.begin();
    setTimeout(function () {
      cenaAtencao.end();
      limpaTodasAsPortas(); // TODO: deve ser responsabilidade da fase de interação
      that.animaObjeto(0);
    }, PARAMS.tempoTentativaMensagemAtencao)

  }

  animaObjeto(numObjeto) {
    if (numObjeto >= this.objetosCertos.length) {
      this.encerraDemonstracao();
      return;
    }

    var objeto = this.objetosCertos[numObjeto];
    stage.addChild(objeto);
    objeto.scaleX = 0.5;
    objeto.scaleY = 0.5;
    var posFinal = getPosicaoDoObjetoNaPorta(objeto, objeto.portaCerta);

    objeto.x = (stage.canvas.width - objeto.getBounds().width) / 2;
    objeto.y = (stage.canvas.height - objeto.getBounds().height) / 2 - 30;
    objeto.scaleX = 1.0;
    objeto.scaleY = 1.0;

    var tween = createjs.Tween.get(objeto, {paused: true})
      .call(abrePorta, [objeto.portaCerta])
      .wait(500)
      .to({
          scaleX: 0.5,
          scaleY: 0.5,
          x: posFinal.x,
          y: posFinal.y
        },
        1000)
      .wait(100)
      .call(function() {
        stage.addChildAt(objeto, 1);
      })
      .call(fechaPorta, [objeto.portaCerta])
      .wait(600)
      .call(() => stage.removeChild(objeto))
      .call(this.animaObjeto.bind(this), [numObjeto + 1]);

    if (this.ehTutorial) {
      var cena = new CenaConfirmarCorrigir(
        () => tween.setPaused(false),
        () => {});
      cena.begin();
    } else {
      tween.setPaused(false);
    }
  }

  encerraDemonstracao() {
    var t1 = PARAMS.tempoTentativaAposFecharUltimaPorta,
        t2 = t1 + PARAMS.tempoTentativaMensagemAtencao,
        cenaSuaVez = new CenaSuaVez(),
        that = this;

    setTimeout(function () {
      cenaSuaVez.begin();
    }, t1);
    setTimeout(function () {
      cenaSuaVez.end();
      that.end();
    }, t2);
  }

  end() {
    // this.objetosCertos.forEach((obj) => stage.removeChild(obj));
    this.quandoFinalizar.notify();
  }
}

class CenaInteracaoFase extends Cena {
  constructor(objetos) {
    super();
    this.objetos = objetos;
    this.rng = new RNG(1);
    this.quandoFinalizar = new Notifier();
  }

  begin() {
    limpaTodasAsPortas();
    abreTodasAsPortas();

    this.embaralhaObjetos();
    this.definePosicaoInicialDosObjetos();

    var that = this;
    this.objetos.forEach(function (obj) {
      stage.addChild(obj);
      that.defineObjetoInteragivel(obj, true);
    });
  }

  end() {
    var that = this;

    setTimeout(function () {
      that.enviaObjetosParaOFundo();
      fechaTodasAsPortas();
      setTimeout(function () {
          that.objetos.forEach(function (obj) {
            stage.removeChild(obj);
            that.defineObjetoInteragivel(obj, false);
          });
          that.quandoFinalizar.notify();
        },
        PARAMS.tempoTentativaAposFecharUltimaPorta);
    }, PARAMS.tempoParaFecharPorta);

  }

  enviaObjetosParaOFundo() {
    for (var i = 0; i < this.objetos.length; i++) {
      stage.addChildAt(this.objetos[i], 1);
    }
  }

  embaralhaObjetos() {
    var that = this;
    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(that.rng.uniform() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }

    shuffle(this.objetos);
  }

  definePosicaoInicialDosObjetos() {
    var center = {
      x: stage.canvas.width / 2,
      y: stage.canvas.height / 2
    },
    semiwidth = 50,
    semiheight = 40,
    ncols = this.objetos.length / 2,
    x1 = center.x - ((ncols - 1) * semiwidth),
    y1 = center.y - semiheight - 30,
    objeto,
    i;

    for (i = 0; i < ncols; i += 1) {
      objeto = this.objetos[i];
      objeto.x = objeto.iniX = x1 + (i * semiwidth * 2) - (objeto.getBounds().width / 4);
      objeto.y = objeto.iniY = y1 - (objeto.getBounds().height / 4);

      objeto = this.objetos[ncols + i];
      objeto.x = objeto.iniX = x1 + (i * semiwidth * 2) - (objeto.getBounds().width / 4);
      objeto.y = objeto.iniY = y1 + 2 * semiheight - (objeto.getBounds().height / 4);
    }
  }

  defineObjetoInteragivel(objeto, interagivel) {
    if (interagivel) {
      objeto.on('mousedown', this.objetoOnMouseDown.bind(this));
      objeto.on('pressmove', this.objetoOnPressMove.bind(this));
      objeto.on('pressup', this.soltaObjeto.bind(this));
    } else {
      objeto.removeAllEventListeners();
    }
  }

  objetoOnMouseDown(evt) {
    var objeto = evt.target;
    objeto.offX = objeto.x - evt.stageX;
    objeto.offY = objeto.y - evt.stageY;
  }

  objetoOnPressMove(evt) {
    var objeto = evt.target;
    stage.canvas.style.cursor = "none";
    objeto.x = evt.stageX + objeto.offX;
    objeto.y = evt.stageY + objeto.offY;
    var match = getPortaSobObjeto(objeto);
    destacaPorta(match);
  }

  soltaObjeto(evt) {
    var that = this;
    destacaPorta(null);

    stage.canvas.style.cursor = "auto";

    var objeto = evt.target,
      idPorta = getPortaSobObjeto(objeto);

    if (idPorta === null || idPorta < 0) {
      // soltou fora de qualquer porta
      moveObjetoParaCenario(objeto);
      adicionaBinding(objeto, null);
    } else if (idPorta === objeto.idPorta) {
      // soltou na mesma porta
      moveObjetoParaPorta(objeto, idPorta);
      tocaAudio("posiciona-obj-duro");
    } else if (portas[idPorta].idObjeto == null) {
      // soltou em uma porta vazia
      moveObjetoParaPorta(objeto, idPorta);
      adicionaBinding(objeto, idPorta);
      tocaAudio("posiciona-obj-duro");
    } else {
      // soltou em uma porta ocupada por outro objeto
      moveObjetoParaCenario(objeto);
    }

    if (this.todosOsObjetosForamPosicionados()) {
      var desfazUltimaAlocacao = function() {
        moveObjetoParaCenario(objeto);
        adicionaBinding(objeto, null);
        that.objetos.forEach((obj) => that.defineObjetoInteragivel(obj, true));
      }
      this.objetos.forEach((obj) => that.defineObjetoInteragivel(obj, false));
      var cenaConfirmarCorrigir = new CenaConfirmarCorrigir(
        this.end.bind(this),
        desfazUltimaAlocacao);
      cenaConfirmarCorrigir.begin();
    }
  }

  todosOsObjetosForamPosicionados() {
    var qtd = this.objetos.reduce(
        (count, obj) => count += (obj.idPorta === null ? 0 : 1),
        0);
    return qtd === this.objetos.length / 2;
  }
}

class Fase {
  /**
   * descricao é um array de tamanho múltiplo de 3; em cada sequência de 3 elementos:
   // O primeiro número é o *id* da porta (contado a partir de 1);
   // o segundo é o *id* do objeto que vai ser colocado na porta,
   // e o terceiro é o *id* de um outro objeto que vai aparecer no final só pra confundir.
   *
   * exemplo: [1, 39, 38, 2, 13, 8]
   */
  constructor(numFase, ehTutorial, descricao) {
    this.quandoFinalizar = new Notifier();
    this.ehTutorial = ehTutorial;
    this.totalObjetosCertos = descricao.length / 3;
    this.objetosCertos = [];
    this.objetos = [];
    this.numFase = numFase;

    for (var i = 0; i < descricao.length; i += 3) {
      let idPorta = descricao[i] - 1,
          idObjeto = descricao[i + 1],
          idOutroObjeto = descricao[i + 2],
          objeto = this.adicionaObjeto(idObjeto, idPorta),
          outro = this.adicionaObjeto(idOutroObjeto, null);
      this.objetos.push(objeto);
      this.objetos.push(outro);

      this.objetosCertos.push(objeto);
    }
  }

  adicionaObjeto(idObjeto, idPorta) {
    var objeto = carregaBitmapDoObjeto(idObjeto);
    objeto.portaCerta = idPorta;
    objeto.idPorta = null;
    objeto.idObjeto = idObjeto;
    objeto.offX = 0;
    objeto.offY = 0;

    objeto.scaleX = objeto.scaleY = .5;
    objeto.x = objeto.iniX = 50 + (idObjeto * 50) % 700;
    objeto.y = objeto.iniY = 200 + 50 * (idObjeto % 2);

    return objeto;
  }

  iniciaDemonstracao() {
    this.cenaDemonstracao = new CenaDemonstracaoFase(this.objetosCertos, this.ehTutorial);
    this.cenaDemonstracao.quandoFinalizar.addListener(this.finalizaDemonstracao.bind(this));
    this.cenaDemonstracao.begin();
  }

  finalizaDemonstracao() {
    this.cenaDemonstracao = null;
    this.iniciaInteracao();
  }

  iniciaInteracao() {
    this.cenaInteracao = new CenaInteracaoFase(this.objetos);
    this.cenaInteracao.quandoFinalizar.addListener(this.finalizaInteracao.bind(this));
    this.cenaInteracao.begin();
  }

  finalizaInteracao() {
    this.cenaInteracao = null;
    this.finalizaFase();
  }

  finalizaFase() {
    var pontuacao = calculaPontuacaoFase(this.numFase, objetos),
      that = this;

    this.enviaPontuacao(pontuacao);
    this.quandoFinalizar.notify();
  }

  enviaPontuacao(pontuacao) {
    $.request('post', 'inserir.php', {trial1_3O: pontuacao.objCerto,
                          trial1_3L: pontuacao.portaCerta,
                          trial1_3OL: pontuacao.objCertoPortaCerta}).then(function (data) { console.log(data); });
  }
}

class Partida {
  constructor() {
  }

  inicia() {
    this.iniciaFase(0);
  }

  iniciaFase(numFase) {
    this.numFaseAtual = numFase;
    if (numFase < 0 || numFase >= especificacoesFase.length) {
      throw 'Fase inválida: ' + numFase;
    }
    var tutorial = (numFase == 0);
    this.faseAtual = new Fase(numFase, tutorial, especificacoesFase[numFase]);
    this.faseAtual.quandoFinalizar.addListener(this.finalizaFase.bind(this));
    this.faseAtual.iniciaDemonstracao();
  }

  finalizaFase() {
    console.log('Partida.finalizaFase');
    if (this.numFaseAtual < especificacoesFase.length - 1) {
      this.numFaseAtual++;
      this.iniciaFase(this.numFaseAtual);
    } else {
      var cenaGameOver = new CenaGameOver();
      cenaGameOver.begin();
    }
  }

}
