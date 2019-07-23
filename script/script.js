var APP = {};
APP.$document = $(document);
APP.slider = $('.slider-container');
APP.dropdown = $('.dropdown');
APP.dropdownContent = $('.dropdown-content');
APP.hamburger = $('.hamburger');
APP.modal = $('.modal');
APP.closeModal = $('.modal-close');
APP.modalBtn = $('.modal-btn');
APP.catalogDropdown = $('.catalog-dropdown');
APP.catalogDropdownBtn = $('.catalog-dropdown__current');
APP.catalogDropdownItem = $('.catalog-dropdown__item');
APP.productsFavBtn = $('.products__star');
APP.cartBtn = $('.cart-btn');
APP.cartDelete = $('.cart-table__delete');
APP.cartClose = $('.cart-back');
APP.filterHide = $('.catalog-filters__name');
APP.filterMore = $('.catalog-filters__more');
APP.filter = $('.catalog-filters__checkbox');
APP.totalSum = $('.cart-total__sum');
APP.filterDropdown = $('.filter-dropdown');
APP.filterDropdownClose = $('.filter-dropdown-close');
APP.productPreview = $('.product-slider__item');
APP.productModal = $('.product-modal');
APP.orderCheckbox = $('.order__checkbox');
APP.historyOpen = $('.history__more');
APP.historyAsideOpen = $('.history-aside__title .icon-uniE011');
APP.showPassword = $('.icon-password');

function currentSlideCount(item){
  var dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

function countTotalSum(){
  var totalSum = 0;
  $('.cart-table__sum span').each(function(){
    totalSum = totalSum + parseInt($(this).text()); 
  });
  APP.totalSum.text(totalSum + ' руб.');
}

function closeModal(){
  APP.modal.removeClass('active');
  $('html').removeClass('overflow');
}

function getProductId(value){
  var data = value;
  console.log(data)
}

function doAnimation(){
    var windowScroll = $(window).height() + APP.$document.scrollTop(),
        element = APP.$document.find('.js-animation:not(.animate)')[0];

  $('.js-animation:not(.animate)').each(function(key, item){
      var itemOffset = $(item).offset().top + 100,
          tableParent = $(item).parents('.palette-table');
    if(windowScroll >= itemOffset){
        $(item).addClass('animate');
    }
  });
};

function countSum(item){
  var parent = $(item).parents('.cart-table__item'),
      price = +parent.find('.cart-table__price span').text(),
      number = parent.find('.cart-table__number input').val(),
      sum = parent.find('.cart-table__sum span');

  sum.text(price * number);
  countTotalSum()
};

$('.catalog-filters__more').each(function(){
  var text = $(this).parents('.catalog-filters-section').find('.catalog-filters__container'),
      textHeight =  text.height(),
      textRealHeigh = text.prop('scrollHeight');
    $(this).hide();
  if(textHeight < textRealHeigh ){
    $(this).show(); 
  }
});

APP.$document.ready(function() {
  APP.showPassword.on('click', function(){
    var input = $(this).parents('.pass').find('input');
    
    if(input.attr('type') === 'password'){
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });

  APP.historyAsideOpen.on('click', function(){
    $(this).parents('.history-aside').toggleClass('open');
  });

  APP.historyOpen.on('click', function(){
    $(this).parents('.history-item').toggleClass('open');
  });

  APP.orderCheckbox.on('click', function(){
    $(this).find('input[type="radio"]').prop('checked', true);
  });

  APP.filterDropdownClose.on('click', function(){
    $('.catalog-filters').removeClass('show');
  });

  APP.filterDropdown.on('click', function(){
    $('.catalog-filters').addClass('show');
  });

  APP.modal.on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

  APP.cartClose.on('click', function(){
    closeModal();
  });

  APP.filterMore.on('click',function(){
    $(this).parents('.catalog-filters-section').toggleClass('show');
  });
  APP.filterHide.on('click', function(){
    $(this).parents('.catalog-filters-section').removeClass('show');
    $(this).parents('.catalog-filters-section').toggleClass('hide');
  });
  APP.cartDelete.on('click', function(){
    $(this).parents('.cart-table__item').hide();
  });
  $('.cart-table__number input').on('keyup', function(){
    countSum(this);
  });

  APP.cartBtn.on('click', function(){
    var element = $(this).parent('.cart-table__number').find('input'),
        currentValue = element.val();

    if($(this).hasClass('plus')){
      currentValue++;
    } else if($(this).hasClass('minus')){
        if(currentValue > 1){
          currentValue--;
        }
    }
    element.val(currentValue);
    countSum(this);
  });
  APP.catalogDropdownItem.on('click', function(){
    $(this).parents('.catalog-dropdown').find('.catalog-dropdown__item').removeClass('current');
    $(this).addClass('current');
    $(this).parents('.catalog-dropdown').find('.catalog-dropdown__current .text').text($(this).text());
    $(this).parents('.catalog-dropdown').removeClass('active');
  });
  APP.catalogDropdownBtn.on('click', function(){
    APP.catalogDropdownBtn.not(this).parents('.catalog-dropdown').removeClass('active');
    $(this).parents('.catalog-dropdown').toggleClass('active');
  });

  APP.closeModal.on('click', function() {
    closeModal();
  });
  APP.modalBtn.on('click', function() {
    var attr = $(this).attr('data-target'),
        modal = $('.modal[data-target="' + attr + '"]');

    if($(this).hasClass('products__star')){
      $('.fav-modal__name').text($(this).parents('.products-item').find('.products__text').text());
    } else if($(this).hasClass('products__cart')){
      var productId = $(this).parents('.products-item').data('id');

      getProductId(productId);
    }

    modal.addClass('active');
    $('html').addClass('overflow'); 
  });
  doAnimation ();
  APP.$document.on('scroll', function(event){
    doAnimation ();
    if($('header').offset().top !== 0){
      $('header').addClass('black');
    } else {
      $('header').removeClass('black');
    }
  });

  $('.header-search').on('click', function(){
    $('body').removeClass('menu');
    APP.hamburger.removeClass('active');
  });

  $('.about__more').on('click', function(){
    $('.about__text').addClass('show');
    $(this).hide();
  });

  APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });

  APP.dropdown.on('click', function(){
    APP.dropdown.not(this).removeClass('active');
    $(this).toggleClass('active');
  });

  $(document).on('click', function(event){
    if(!$(event.target).parents('.dropdown-parent').length) {
      APP.dropdown.removeClass('active');
    }

    if(!$(event.target).parents('.catalog-dropdown').length) {
      $('.catalog-dropdown').removeClass('active');
    }
  })

  APP.slider.each(function(key, item) {
    var options = {
      infinite: attr('infinite')? attr('infinite') : false,
      vertical: attr('vertical')? attr('vertical') : false,
      slidesToShow: attr('show'),
      slidesToScroll: attr('scroll')? attr('show') : 1,
      arrows: true,
      // focusOnSelect: true,
      dots: attr('dots')? false : true,
      nextArrow: '<button class="slick-next slick-arrow flex-c-c"><i class="icon-uniE00F"></i></button>',
      prevArrow: '<button class="slick-prev slick-arrow flex-c-c"><i class="icon-uniE00E"></i></button>',
      initialSlide: attr('current')? attr('current') : 0,
      centerMode: attr('center')? attr('center') : false,
      responsive: [{
        breakpoint: 1140,
        settings: {
          slidesToShow: attr('show-tablet'),
          slidesToScroll: attr('show-tablet'),
          centerMode: false
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: attr('show-mobile'),
          slidesToScroll: 1,
          vertical: attr('vertical-mobile')? attr('vertical-mobile') : false,
          centerMode: false
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
    currentSlideCount(item);
    $(item).on('afterChange', function(event, slick, currentSlide, nextSlide){
      currentSlideCount(item)
    });
  });



});