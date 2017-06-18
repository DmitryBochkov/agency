(function() {
  // Add event listener for open form button
  var openFormButton = document.querySelector('.arrow-down');
  var form = document.querySelector('.form');
  var nav = document.querySelector('.nav');

  if (openFormButton) {
    openFormButton.addEventListener('click', function(e) {
      e.preventDefault();
      agency.form.open();
    });
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (agency.form.isValid()) {
        console.log('ok');
      } else {
        console.log('not ok');
      }
    });
  }

  if (nav) {
    nav.addEventListener('click', function(e) {
      var target = e.target;

      if (target.tagName.toLowerCase() !== 'a') {
        return;
      }

      e.preventDefault();
      agency.navigation.toggleActiveLink(target);
    });
  }
})();
