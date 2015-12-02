(function(){
    var stage;
    // objetos
    var jarra, torta, luva;
    // cenário
    var cenario;
    //Mapa de solução do problema
    var mapa = [[0,0],[0,0],    [0,0],[0,0],
                [0,0],[0,0],    [0,0],[0,0],

                [0,0],[0,0],    [0,0],[0,0],
                [0,0],[0,0],    [0,0],[0,0]];
    function init() {
        // cria a cena para guardar os objetos na tela
        stage = new createjs.Stage("canvas");
        cenario = new Objeto(stage, {src : "cozinha.jpg", x: 0, y: 10});
        jarra = new Objeto(stage, {src : "jarra.png", x: 0, y: 10},true);
        torta = new Objeto(stage, {src : "torta.png", x: 200, y: 10},true);
        luva = new Objeto(stage, {src : "luva.png", x: 500, y: 10},true);
        // redesenha a cena várias vezes por segundo
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    window.init = init;
})();
