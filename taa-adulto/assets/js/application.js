(function(){
    'use strict'
    var stage;
    var disposicaoObjetos = [];
    var linha = [26,102,427,508];
    var coluna = [66,202,522,662];
    function init() {
        // cria a cena para guardar os objetos na tela
        stage = new createjs.Stage("canvas");
        //Adicionando a cozinha ao cenario
        stage.add({src : "cozinha.jpg", x: 0, y: 10});
        //Adicionando as posicoes finais
        for (var i = linha.length - 1; i >= 0; i--) {
            for (var j = coluna.length - 1; j >= 0; j--) {
                disposicaoObjetos.push({x: coluna[j], y: linha[i]});
            }
        }
        //Adicionando objetos em suas posicoes finais
        for (var i = disposicaoObjetos.length - 1; i >= 0; i--) {
            stage.add({src : "jarra.png", x: disposicaoObjetos[i].x, y: disposicaoObjetos[i].y, scaleX: 0.5, scaleY: 0.5},true);
        };
        // redesenha a cena várias vezes por segundo
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    window.init = init;
})();
