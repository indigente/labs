function initForm(language) {
  var form = document.getElementById('form');
  
  form.addEventListener('submit', function (e) {
    if (form.checkValidity()) {
      submitForm(form, language);
    }
    e.preventDefault();
  }, false);  
}

function submitForm(elt, language) {
  var json = FormJson.toJson(elt);
  Cookies.set('userdata', json);
  window.location.href = 'taa.html?' + language;
}


FormJson = {
  fromJson: function (json) {
    return JSON.parse(json);
  },
  toJson: function (form) {
    formdata = {}

    if (!form || form.nodeName !== "FORM") {
      return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
      if (form.elements[i].name === "") {
        continue;
      }
      switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
        case 'text':
        case 'hidden':
        case 'password':
        case 'button':
        case 'reset':
        case 'submit':
          formdata[form.elements[i].name] = form.elements[i].value;
          break;
        case 'checkbox':
        case 'radio':
          if (form.elements[i].checked) {
            formdata[form.elements[i].name] = form.elements[i].value;
          }           
          break;
        case 'file':
          break;
        }
        break;       
      case 'TEXTAREA':
        formdata[form.elements[i].name] = form.elements[i].value;
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
        case 'select-one':
          formdata[form.elements[i].name] = form.elements[i].value;
          break;
        case 'select-multiple':
          for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
            if (form.elements[i].options[j].selected) {
              formdata[form.elements[i].name] = form.elements[i].options[j].value;
            }
          }
          break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
        case 'reset':
        case 'submit':
        case 'button':
          formdata[form.elements[i].name] = form.elements[i].value;
          break;
        }
        break;
      }
    }
    return JSON.stringify(formdata);
  }
}

// based on serialize-0.2.js
