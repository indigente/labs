localeStrings = {
  pt: {
    "msg-tutorial-first-object": 'Preste atenção neste objeto. Memorize o objeto e a porta onde ele será guardado.',
    "msg-tutorial-second-object": 'Memorizou? Agora mais um objeto. Preste atenção onde ele será guardado.',
    "msg-drag-objects": 'Agora arraste os dois objetos para as portas corretas.',
    "msg-tutorial-incorrect": 'Vamos tentar mais uma vez? Preste atenção nos objetos e nas portas onde eles serão guardados.',
    "msg-tutorial-correct": 'Muito bem! Agora vamos repetir esse desafio algumas vezes, aumentando a dificuldade. Só mostraremos o resultado no final. Você está pronto?',

    "msg-ok": "OK",
    "msg-attention": "Atenção!",
    "msg-thank-you": "Obrigado por participar!",
    "msg-score": "Sua pontuação é",
    "msg-control-c": 'Digite Ctrl+C para copiar',
    "msg-your-turn": 'Agora é sua vez!',
    "btn-confirm": "Confirmar",
    "btn-correct": "Corrigir",
    "msg-complete-form": "Preencha todo o formulário antes de continuar."
  },
  en: {
    // "msg-tutorial-preamble": 'On this task, you will see objects being put into different cupboards in the kitchen. You have to remember which cupboard each object is put in.',
    "msg-tutorial-first-object": 'Pay attention to this object and which cupboard it goes in. You have to remember which cupboard it goes in.',
    "msg-tutorial-second-object": "Here’s another object. Pay attention to which cupboard it goes in.",
    "msg-drag-objects": 'Now put both objects in their correct cupboards.',
    "msg-tutorial-incorrect": "Let's try again. Pay attention to the objects and which cupboard they go in. You have to remember which cupboard each object goes in.",
    "msg-tutorial-correct": "Very good. Let's try some more. To make the test more difficult, the computer will start to show you more objects at the same time. Try to remember which cupboard each object goes in.",

    "msg-ok": "OK",
    "msg-attention": "Attention!",
    "msg-thank-you": "Thank you for participating!",
    "msg-score": "Your score is",
    "msg-control-c": 'Press Ctrl+C to copy',
    "msg-your-turn": "Now it's your turn!",
    "btn-confirm": "Confirm",
    "btn-correct": "Change",
    "msg-complete-form": "Fill in the whole form before continuing."
  }
}

function isLocalizationValid() {
  var i,
    keysPerLanguage = Object.keys(localeStrings).map(key => localeStrings[key]).map(obj => Object.keys(obj)),
    valid = true,
    first;

  if (keysPerLanguage.length > 1) {
    first = JSON.stringify(keysPerLanguage[0]);
    for (i = 1; i < keysPerLanguage.length; i++) {
      if (first !== JSON.stringify(keysPerLanguage[i])) {
        valid = false;
        break;
      }
    }
  }

  return valid;
}

if (!isLocalizationValid()) {
  alert('Error in localized strings.');
}

function _l(key) {
  if (idioma in localeStrings && key in localeStrings[idioma]) {
    return localeStrings[idioma][key];
  } else {
    alert('Localized string not found for language "' + idioma + '" and key "' + key + '"');
  }
}