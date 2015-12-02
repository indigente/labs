var Objeto = (function () {
    'use strict'
    function Objeto(stage, options, isDraggable) {
        this.stage = stage;
        this.options = options;
        this.isDraggable = isDraggable || false;
        this.carregaObjeto();
    }
    Objeto.prototype.arrastaObjeto = function(evt) {
        evt.target.x = evt.stageX - evt.target.getBounds().width * evt.target.scaleX / 2;
        evt.target.y = evt.stageY - evt.target.getBounds().height * evt.target.scaleY / 2;
    };
    Objeto.prototype.carregaBitmap = function() {
        if(this.options.async){
            this.bitmapObject = new createjs.Bitmap("assets/images/" + this.options.src);
            carregaBMP(this);
        }else{
            var self = this;
            var image = new Image();
            image.src = "assets/images/" + self.options.src;
            image.onload = handleImageLoad;
            function handleImageLoad(){
                self.bitmapObject = new createjs.Bitmap(image);
                carregaBMP(self);
            }
        }
    };
    Objeto.prototype.carregaObjeto = function() {
        this.carregaBitmap(this.stage, this.options.src, this.options.x || 0, this.options.y || 0);
    };
    Objeto.prototype.draggable = function(){
        if(this.isDraggable){
            this.bitmapObject.addEventListener("pressmove", this.arrastaObjeto);
        }
    };
    Objeto.prototype.drawByCenter = function(){
        this.bitmapObject.x -= this.bitmapObject.getBounds().width * this.bitmapObject.scaleX / 2;
        this.bitmapObject.y -= this.bitmapObject.getBounds().height * this.bitmapObject.scaleY / 2;
    };
    //Metodo privado da classe
    function carregaBMP(parent){
        parent.bitmapObject.scaleX = parent.options.scaleX || 1;
        parent.bitmapObject.scaleY = parent.options.scaleY || 1;
        parent.bitmapObject.x = parent.options.x;
        parent.bitmapObject.y = parent.options.y;
        parent.stage.addChild(parent.bitmapObject);
        if(parent.isDraggable){
            parent.draggable();
        }
        if(parent.options.drawByCenter){
            parent.drawByCenter();
        }
    }
    return Objeto;
})();

