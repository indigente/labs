(function(){
    'use strict'
    var stage;
    var disposicaoObjetos = [];
    var linha =  [56,135,460,540]; //[26,102,427,508];
    var coluna = [96,232,552,692]; //[66,202,522,662];
    var objetos = ['jarra.png','luva.png','torta.png'];
    function init() {
        // cria a cena para guardar os objetos na tela
        stage = new createjs.Stage("canvas");
        //Adicionando a cozinha ao cenario
        stage.add({src : "cozinha.jpg", x: 0, y: 10, async: true});
        //Adicionando as posicoes finais
        for (var i = linha.length - 1; i >= 0; i--) {
            for (var j = coluna.length - 1; j >= 0; j--) {
                disposicaoObjetos.push({x: coluna[j], y: linha[i]});
            }
        }
        //Adicionando objetos em suas posicoes finais
        for (var i = disposicaoObjetos.length - 1; i >= 0; i--) {
            colocaObjetoNaPorta(rand(objetos.length), i);
        };
        // redesenha a cena várias vezes por segundo
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
        // ativa touchscreen
        createjs.Touch.enable(stage);
    }
    function colocaObjetoNaPorta(idObjeto, idPorta) {
        stage.add({src : objetos[idObjeto], x: disposicaoObjetos[idPorta].x, y: disposicaoObjetos[idPorta].y, scaleX: 0.5, scaleY: 0.5, drawByCenter: true},true);
    }
    function rand(max, min){
        var min = min || 0; //Por default o minimo eh zero
        return Math.floor((Math.random() * max) + min);
    }
    window.init = init;
})();
