(function(){
    'use strict'
    //Adicionando função em Stage
    //Estendendo classe
    createjs.Stage.prototype.add = function(options, isDraggable){
        new Objeto(this, options, isDraggable);
    };
})();