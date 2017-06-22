(function() {
  var prev = document.querySelector('.prev');
  var next = document.querySelector('.next');

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });
  next.addEventListener('click', function() {
    plusSlides(1);
  });

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("hero__slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "block";
  }
})();
