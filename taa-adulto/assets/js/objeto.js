var Objeto = (function () {
    'use strict'
    function Objeto(stage, options, isDraggable) {
        this.stage = stage;
        this.options = options;
        this.isDraggable = isDraggable || false;
        this.carregaObjeto();
        if(this.isDraggable){
            this.draggable();
        }
    }
    Objeto.prototype.arrastaObjeto = function(evt) {
        evt.target.x = evt.stageX - evt.target.getBounds().width * evt.target.scaleX / 2;
        evt.target.y = evt.stageY - evt.target.getBounds().height * evt.target.scaleY / 2;
    };
    Objeto.prototype.carregaBitmap = function() {
        this.bitmapObject = new createjs.Bitmap("assets/images/" + this.options.src);
        this.bitmapObject.x = this.options.x;
        this.bitmapObject.y = this.options.y;
        this.bitmapObject.scaleX = this.options.scaleX || 1;
        this.bitmapObject.scaleY = this.options.scaleY || 1;
        this.stage.addChild(this.bitmapObject);
    };
    Objeto.prototype.carregaObjeto = function() {
        this.carregaBitmap(this.stage, this.options.src, this.options.x || 0, this.options.y || 0);
    };
    Objeto.prototype.draggable = function(){
        if(this.isDraggable){
            this.bitmapObject.addEventListener("pressmove", this.arrastaObjeto);
        }
    };
    return Objeto;
})();

