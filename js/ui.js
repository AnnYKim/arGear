// ui.js
// 2018-05-03 03:16





// ==========================


// [*] IE 판단
document.documentElement.setAttribute("data-agent", navigator.userAgent);


// ==========================


// [*] 플레이스홀더 변경
function changePlaecholder(breakP1){
  var $input = $(".form-email");
  var $btn = $(".form-button");
  var windowW = $(window).width();
  
  if(windowW < breakP1){
    $input.attr("placeholder","Enter your email");
  }else{
    $input.attr("placeholder","Enter your email to get updates");
  }
}

// ==========================


// [*] 반응형 분기점
var breakPoint = [640, 768, 960, 1024];

// [*] tablet 이하 크기 판단해서 메뉴 고정
function isSmallScreen(){
  if ($(window).width() < breakPoint[2]) {
    $("body").addClass('screen-small');
    $('.header').removeClass('sticky').removeAttr('style');
  }else{
    $("body").removeClass('screen-small');
    if($('.header').hasClass("opened")){
      $('.header').removeClass("opened");
    }
  }
}




function preventScroll(){
  $("body").css({"margin-right":scrollBarWidth(),"width":"auto"}).addClass("noScroll");
}
function allowScroll(){
  $("body").removeAttr("style").removeClass("noScroll");
}

function scrollBarWidth() { //스크롤바 구하기
  document.body.style.overflow='hidden';var width=document.body.clientWidth;document.body.style.overflow='scroll';width-=document.body.clientWidth;if(!width)width=document.body.offsetWidth-document.body.clientWidth;document.body.style.overflow='';return width;
}



$(function(){

  // [*] 전역변수

  var sectionTop = []; //각 section의 위치
  var headerHeight = 80; //header의 높이 (PC = 80, mobile = 70)
  var headerMenuLength = 3; //클릭 시 이동하는 메뉴의 개수

  var $body = $("html, body");
  var $header = $(".header");
  var $burger = $header.find(".hamburger");
  var $navMenu = $(".gnb li .nav-menu");
  var $navBg = $(".fixed-bg");
      

  // [*] 각 section의 위치 구하는 함수
  function getSectionTop(){
    $(".section").each(function(idx) {
        sectionTop[idx] = Math.ceil($(this).offset().top);
    });
  }

  // [*] 스크롤 함수
  function scroll(where){ 
    $body.stop().animate({
      scrollTop: where
    },800);
  }

  // [*] 헤더 링크 클릭 시 해당 섹션으로 이동
  function headerFunc(){ 
    $navMenu.on('click',function(e){
      e.preventDefault();

      $("body").hasClass("screen-small") ? headerHeight = 0 : headerHeight = 80;

      var idx = $navMenu.index($(this));
      var position = (sectionTop[idx+1] - headerHeight);

      // Engine 섹션은 예외
      if (idx === 2){
        position -= 280;
      }

      scroll(position);

      if ($header.hasClass("opened")){
        closeBurgerMenu();
      }
    });
  }

  // [*] 1 섹션 이상 스크롤 시 헤더 고정
  function makeHeaderSticky(){
   
    if(!$("body").hasClass("screen-small")){

      $("body").hasClass("screen-small") ? headerHeight = 70 : headerHeight = 80;

      if ($(window).scrollTop() >= sectionTop[1] - headerHeight ) {
        $header.addClass('sticky').css({marginTop: headerHeight});
      }else {
        $header.removeClass('sticky').removeAttr('style');
      }
   }

  }

  // [*] 로고 클릭 시 맨 위로 이동
  function clickHeaderLogo(){
    $("h1.header-logo").on("click",function(e){
      e.preventDefault();
      scroll(0);
    });
  }

  // [*] 버거 메뉴 오픈
  function openBurgerMenu(){
    $header.addClass("opened");
    preventScroll();
  }

        
  // [*] 버거 메뉴 클로즈
  function closeBurgerMenu(){
    $header.removeClass("opened");
    allowScroll();
  }


  function initEvent(){

    //모바일 크기 판단
    isSmallScreen();

    //섹션위치 구함
    getSectionTop();

    //헤더 메뉴 클릭 시 이동
    headerFunc();

    //헤더영역 고정
    makeHeaderSticky();

    //로고 클릭 시 맨 위로
    clickHeaderLogo();

    
    //버거 토글
    $burger.on('click',function(e){
      e.preventDefault();
      $header.hasClass('opened') ? closeBurgerMenu() : openBurgerMenu();
    });



    $(window).on("scroll",function(){
      makeHeaderSticky();
    });

    $(window).on('resize',function(){
      isSmallScreen();
      getSectionTop();
      makeHeaderSticky();
    });


  }



  $(window).on("load",function(){

    initEvent();
    

  });


});





$(window).on("load resize", function(){
  changePlaecholder(640);
});





