(function(){
    'use strict'
    /*** CREATEJS ***/
    //Adicionando função em Stage
    //Estendendo classe
    createjs.Stage.prototype.add = function(options, isDraggable){
        return new Objeto(this, options, isDraggable);
    };
    /*** ARRAY ***/ 
    /**
     * Pegar elemento do array
     * @param  int idx [description]
     * @return o elemento de indice {idx} do array e o retira do array
     */
    Array.prototype.getElementAt = function(idx){
        return this.splice(idx,1)[0];
    };
})();