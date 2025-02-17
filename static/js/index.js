// ver animação de typing 
// https://css-tricks.com/snippets/css/typewriter-effect/
$(document).ready(function() {
    function checkVisibility() {
      var windowHeight = $(window).height();
      var scrollPosition = $(window).scrollTop();
      var scrollThreshold = scrollPosition + (windowHeight * 0.75); // 20% do espaço da tela
      
      $('.block-content').each(function() {
        var elemTop = $(this).offset().top;
        if (elemTop < scrollThreshold) {
            $(this).find('.hidden-text').addClass('show-text');
            $(this).find('.hidden-icon').addClass('show-icon');
            setTimeout(() => {
              $(this).find('.un').addClass('active');
            }, 3000);

        } else {
            $(this).find('.hidden-text').removeClass('show-text');
            $(this).find('.hidden-icon').removeClass('show-icon');
            $(this).find('.un').removeClass('active');      
        }
  
      });
    }
    
    checkVisibility();
    
    $(window).on('load scroll', function() {
      checkVisibility();
    });
  
  
  
  });

  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 180;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

document.addEventListener("DOMContentLoaded", function () {
    var source = "static/audio/videoplayback.m4a";
    var audio = new Audio(source);

    // Adiciona o evento de clique aos elementos da classe "subtitle"
    document.querySelectorAll(".subtitle").forEach(function (element) {
        element.addEventListener("click", function () {
            audio.currentTime = 0; // Reinicia o áudio
            audio.play().catch(error => {
                console.log("Autoplay bloqueado pelo navegador:", error);
            });
        });
    });
});
