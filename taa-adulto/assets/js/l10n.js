localeStrings = {
  pt: {
    "msg-ok": "OK",
    "msg-attention": "Atenção!",
    "msg-thank-you": "Obrigado por participar!\nSua pontuação é ",
    "msg-control+c": 'Digite Ctrl+C para copiar',
    "msg-your-turn": 'Agora é sua vez!',
    "btn-confirm": "Confirmar",
    "btn-correct": "Corrigir",
    "msg-complete-form": "Preencha todo o formulário antes de continuar.",
    "msg-tutorial-correct": 'Muito bem! Agora vamos repetir esse desafio algumas vezes, aumentando a dificuldade. Só mostraremos o resultado no final. Você está pronto?',
    "msg-tutorial-incorrect": 'Vamos tentar mais uma vez? Preste atenção nos objetos e nas portas onde eles serão guardados.',
    "msg-tutorial-first-object": 'Preste atenção neste objeto. Memorize o objeto e a porta onde ele será guardado.',
    "msg-tutorial-second-object": 'Memorizou? Agora mais um objeto. Preste atenção onde ele será guardado.',
    "msg-drag-objects": 'Agora arraste os dois objetos para as portas corretas.'
  },
  en: {
    "msg-ok": "OK",
    "msg-attention": "Attention!",
    "msg-thank-you": "Thank you for participating!\nYour score is ",
    "msg-control+c": 'Press Ctrl+C to copy',
    "msg-your-turn": "Now it's your turn!",
    "btn-confirm": "Confirm",
    "btn-correct": "Undo",
    "msg-complete-form": "Fill in the whole form before continuing.",
    "msg-tutorial-correct": "Very good! We are going to repeat the challenge multiple times, with increasing difficulty. You'll only see your results in the end. Are you ready?",
    "msg-tutorial-incorrect": 'Shall we try it again? Pay attention to the objects and the doors where they are kept.',
    "msg-tutorial-first-object": 'Pay attention to this object. Memorize the object and the door where it will be kept.',
    "msg-tutorial-second-object": "Did you memorize it? Here 's another object. Pay attention to the door where it will be kept.",
    "msg-drag-objects": 'Now drag both objects to their correct doors.'
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