var Game = {};
Game.start = function(){
    'use strict'
    var canvas = document.getElementById('canvas');
    var stage;
    var disposicaoObjetos = [];
    var linha =  [56,135,460,540]; //[26,102,427,508];
    var coluna = [96,232,552,692]; //[66,202,522,662];
    var objetos = ['jarra.png','luva.png','torta.png'];
    var mapa = [0,0,    0,0,
                0,0,    0,0,

                0,0,    0,0,
                0,0,    0,0];
    var nivel = [];
    //adicionando 1 nivel
    nivel[0] = {objeto: [0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0], porta: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};
    // cria a cena para guardar os objetos na tela
    stage = new createjs.Stage("canvas");
    //Adicionando a cozinha ao cenario
    stage.add({src : "cozinha.jpg", x: 0, y: 10});
    //Adicionando as posicoes finais
    for (var i = linha.length - 1; i >= 0; i--) {
        for (var j = coluna.length - 1; j >= 0; j--) {
            disposicaoObjetos[i*linha.length+j] = {x: coluna[j], y: linha[i]};
        }
    }
    // redesenha a cena várias vezes por segundo
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    var atual = 0, i = 0;
    var target = stage.add({src : objetos[nivel[atual].objeto[i]], x: stage.canvas.width/2, y: stage.canvas.height/2, drawByCenter: true, async: false},true);
    target.startAnimate({x: stage.canvas.width/2, y: stage.canvas.height/2}, nivel[atual], disposicaoObjetos, 0, nivel[atual].objeto.length);

    var espaco = 60;
    function tick(){
        stage.update();
    }
    function colocaObjetoNaPorta(idObjeto, idPorta) {
        return stage.add({src : objetos[idObjeto], x: disposicaoObjetos[idPorta].x, y: disposicaoObjetos[idPorta].y, scaleX: 0.5, scaleY: 0.5, drawByCenter: true, async: false},true);
    }
    function rand(max, min){
        var min = min || 0; //Por default o minimo eh zero
        return Math.floor((Math.random() * max) + min);
    }
    /**
     * Exemplo de uso
     * //Adicionando linha horizontal
     * addLine("#0f0",0,stage.canvas.height/2-espaco,stage.canvas.width,stage.canvas.height/2-espaco);
     * addLine("#0f0",0,stage.canvas.height/2+espaco,stage.canvas.width,stage.canvas.height/2+espaco);
     * 
     * //Adicionado linha vertical
     * addLine("#00f",stage.canvas.width/2-espaco,0,stage.canvas.width/2-espaco,stage.canvas.height);
     * addLine("#00f",stage.canvas.width/2+espaco,0,stage.canvas.width/2+espaco,stage.canvas.height);
     *
     * addLine("#ff0",0,stage.canvas.height/2,stage.canvas.width,stage.canvas.height/2);
     * addLine("#ff0",stage.canvas.width/2,0,stage.canvas.width/2,stage.canvas.height);
     */
    function addLine(color,moveX, moveY, toX, toY){
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(1);
        line.graphics.beginStroke(color);
        line.graphics.moveTo(moveX, moveY);
        line.graphics.lineTo(toX, toY);
        line.graphics.endStroke();
        stage.addChild(line);
    }
};
