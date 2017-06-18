(function() {
  var me = {};


  me.toggleActiveLink = function(target) {
    var links = document.querySelectorAll('.nav__link');
    var showedSection = target.dataset.link;

    for (var i = 0; i < links.length; i++) {

      if (links[i].classList.contains('active')) {
        links[i].classList.remove('active');
      }
    }

    target.classList.add('active');
    scrollToActiveSection(showedSection);
  };

  function getScrollTop(){
    if (typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
  }


  function scrollToActiveSection(showedSection) {
    var section = document.querySelector('.' + showedSection);
    var coords = section.getBoundingClientRect();

    var timerId = setInterval(function() {
      if (getScrollTop() < coords.top) {
        window.scrollBy(0, 20);
      } else {
        clearInterval(timerId);
      }
    }, 0.4);


  }

  agency.navigation = me;
})();
