/*jslint browser: true, indent: 2*/
/*global $,createjs*/

var idioma = "pt"; // alternativa: en


function mudaIdioma(novoIdioma) {
  'use strict';
  idioma = novoIdioma;
}

function escondeTudo() {
  'use strict';
  $("#canvas").hide();
  $(".mensagem").hide();
  $(".formulario").hide();
}

function mostraTelaEmBranco() {
  'use strict';
  escondeTudo();
  $(".mensagem.embranco").show();
  createjs.Ticker.setPaused(true);
}

function mostraMensagem(idMensagem) {
  'use strict';
  escondeTudo();
  $(".mensagem." + idioma + "." + idMensagem).show();
  createjs.Ticker.setPaused(true);
}

function mostraFormulario() {
  'use strict';
  escondeTudo();
  $(".formulario." + idioma).show();
  createjs.Ticker.setPaused(true);
}

function mostraJogo() {
  'use strict';
  escondeTudo();
  $("#canvas").show();
  createjs.Ticker.setPaused(false);
}

function validaForm(){
  'use strict';
  var valido=false;
  if((document.getElementById('nome').value).length>0)
    if(document.getElementById('sexo').value!="none")
      if(document.getElementById('nascimento').value!="")
        if(document.getElementById('escolaridade').value!="none")
          if(document.getElementById('local').value!="none")
            valido=true;
  if(valido)
    mostraJogo();
  else
    alert("Compilar todo o formulario!");
}