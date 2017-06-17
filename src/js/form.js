(function() {
  var me = {};
  var form = document.querySelector('.form-wrapper');
  var closeButton = null;

  function onClose() {
    me.close();
    closeButton.removeEventListener('click', onClose);
  }

  me.open = function() {
    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close-btn');
    closeButton.addEventListener('click', onClose);
  };

  me.close = function() {
    form.classList.add('is-hidden');
  };

  me.isValid = function() {
    var requiredFields = document.querySelectorAll('[data-valid="required"]');
    var emailValue = document.querySelector('[data-email]').value;
    var phoneValue = document.querySelector('[data-phone]').value;

    if (!me.isAllFilledIn(requiredFields)) {
      console.log('All fields are required.')
      return false;
    } else if (!agency.validation.isEmail(emailValue)) {
      console.log('Email is not valid');
      return false;
    } else if (!agency.validation.isNumber(phoneValue)) {
      console.log('Phone is not valid');
      return false;
    }
    return true;
  };

  me.isAllFilledIn = function(data) {
    var result = true;
    for (var i = 0; i < data.length; i++) {
      if (!agency.validation.isNotEmpty(data[i].value)) {
        result = false;
        break;
      }
    }

    return result;
  };

  agency.form = me;
})();
