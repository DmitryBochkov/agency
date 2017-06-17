(function() {
  // Add event listener for open form button
  var openFormButton = document.querySelector('.arrow-down');
  var form = document.querySelector('.form');

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
})();
