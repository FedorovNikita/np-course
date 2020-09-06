  var wow = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
      }
    );
    wow.init();
  
  //   var rellax1 = new Rellax('.circle1');
  
  //   var rellax2 = new Rellax('.circle2');
  
  //   var rellax3 = new Rellax('.chart');
  var e=new ScrollMagic.Controller;
  var p=new ScrollMagic.Scene({triggerElement:".form-footer",triggerHook:0.5,duration:"200%"}).setTween(".chart",1,{rotation:360}).addTo(e);
  var p=new ScrollMagic.Scene({triggerElement:".what",triggerHook:1,duration:"200%"}).setTween(".circle2",1,{rotation:360}).addTo(e);
  
  let mainMenu = document.querySelector('.menu-header');
  let sandwich = document.querySelector('.sandwich');

  sandwich.addEventListener('click', function () {
    sandwich.classList.toggle('sandwich--active');
    mainMenu.classList.toggle('menu-header--active');
  })

  
  $('.menu-header a,.button-header').on( 'click', function(){ 
    sandwich.classList.toggle('sandwich--active');
    mainMenu.classList.toggle('menu-header--active');  
    var el = $(this);
      var dest = el.attr('href'); // получаем направление
      if(dest !== undefined && dest !== '') { // проверяем существование
          $('html').animate({ 
              scrollTop: $(dest).offset().top-100 // прокручиваем страницу к требуемому элементу
          }, 500 // скорость прокрутки
          );
          $('body').removeClass('show-mobile-menu');
      }
      return false;
  });
  
  
  $('form').on('submit', (event) => {
      event.preventDefault();
      let form = $(event.target),
          formData = form.serialize();
  
      $.ajax({
          type: "post",
          url: "form-send.php",
          data: `${formData}&from=${window.location.href}`,
          success(msg) {
              if (msg == "success") {
                location.replace("success.html");
              } else if(msg == "success-ask") {
                console.log("Вопрос отправлен");
                $(".ask button").text('Вопрос отправлен');
                $('.ask button').prop('disabled', true);
              }
          }
      })
  
  });

  $('.accordion').accordion({
    heightStyle: 'content',
    header: '> .accordion-item > .accordion-header',
    collapsible: true
  });

  $("select").selectize({
    scrollDuration: 1000,
    persist: false,
    create: false,
    placeholder: "Предпочитаемый курс",
  });



  $(window).on('load resize', function() {
    if ($(window).width() < 767) {
      $('.gallery-mobile:not(.slick-initialized)').slick({
        dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      arrows: false,
      });
    } else {
      $(".gallery-mobile.slick-initialized").slick("unslick");
    }
  });
