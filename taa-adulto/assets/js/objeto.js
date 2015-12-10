var Objeto = (function () {
    'use strict'
    //Construtor da classe
    function Objeto(stage, options, isDraggable) {
        this.stage = stage;
        this.options = options;
        this.options.async = this.options.async === undefined ? true : this.options.async;
        this.options.scaleX = this.options.scaleX || 1; 
        this.options.scaleY = this.options.scaleY || 1;
        this.bitmapObjectIsLoad = false; 
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
            this.bitmapObjectIsLoad = true;
        }else{
            var self = this;
            var image = new Image();
            image.src = "assets/images/" + self.options.src;
            image.onload = handleImageLoad;
            function handleImageLoad(){
                self.bitmapObject = new createjs.Bitmap(image);
                self.bitmapObjectIsLoad = true;
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
    Objeto.prototype.startAnimate = function(from, nivel, to, atual, max){
        var self = this;
        if(!self.async){
            var timer = 0;
            var id = setInterval(function(){ 
                if(timer > 5 || self.bitmapObjectIsLoad){
                    clearInterval(id);
                    if(self.bitmapObjectIsLoad){
                        self.animate(self.bitmapObject, from, nivel, to, atual, max);                
                    }
                }
                timer++;
            }, 1000);
        }
    }
    Objeto.prototype.animate = function(target, from, nivel, to, atual, max){
        var self = this;
        var scaleX = 0.5;
        var scaleY = 0.5;
        createjs.Tween.get(target)
                .to({alpha: 1.0},500)
                .to({scaleX: scaleX, scaleY: scaleY, x: to[nivel.porta[atual]].x - self.bitmapObject.getBounds().width * scaleX / 2, y: to[nivel.porta[atual]].y - self.bitmapObject.getBounds().height * scaleY / 2},2000)
                .to({alpha: 0.0},1000)
                .to({scaleX: self.options.scaleX, scaleY: self.options.scaleY, x: from.x - self.bitmapObject.getBounds().width * self.bitmapObject.scaleX / 2, y: from.y - self.bitmapObject.getBounds().height * self.bitmapObject.scaleY / 2})
                .call(nextAnimate);
        function nextAnimate(){
            if(atual + 1 < max){
                self.animate(target, from, nivel, to, atual + 1, max);
            }
        }
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

