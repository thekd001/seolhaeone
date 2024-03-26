// 스크롤 부드러움효과
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

//nav
$('.menu-btn').click(function(){
    lenis.stop();
    $(this).toggleClass('on');
    $('.full-menu').toggleClass('show');
    if(!$(this).hasClass('on')){
        lenis.start();
    }
    if($('.header').hasClass('active')){
        setTimeout(() => {
            $('.header').removeClass('active');
        }, 100);
    }else if($(window).scrollTop() <= 50){
        $('.header').removeClass('hide');
    }else{
        $('.header').addClass('hide');
    }
});

$('.full-menu .nav .expected').click(function(e){
    e.preventDefault();
    targetName=$(this).data('target');

    $('.menu-btn').removeClass('on')
    $('.full-menu').removeClass('show');

    lenis.start();
    setTimeout(() => {
        lenis.scrollTo(targetName)
    }, 100);
})

// header
let lastScroll = 0;

$(window).scroll(function(){
    curr = $(this).scrollTop();
    winHeight = $(window).height();
    foot = $('.footer').offset().top;
    ftHeight = $('.footer').innerHeight();

    if(curr + winHeight > foot){
        $('.btn-top').addClass('ab');
        $('.btn-top').css('bottom', ftHeight + 65);
    }else{
        $('.btn-top').removeClass('ab');
        $('.btn-top').css('bottom', 65);
    }

    if(curr >= 50){
        $('.header').addClass('active')
    }else{
        $('.header').removeClass('active')
    }

    if (curr > lastScroll) {
        $('.header').addClass('hide')
    } else {
        $('.header').removeClass('hide')
    }
    lastScroll = curr;
})

// 설해원 소개슬라이드
const slide1 = new Swiper('.universe-slide',{   
    effect: "fade",
    autoplay:{
        delay:2000,
    },
    on:{
        "slideChange":function(){
            $(".sec-universe .universe-item li").eq(this.realIndex).addClass('on').siblings().removeClass('on');
            
        }
    },
    loop: true,
})
$('.universe-item li').hover(function(){
    idx=$(this).index();
    $(this).siblings().removeClass('on');
    slide1.slideToLoop(idx);
})
$('.universe-item li a').click(function(e){
    e.preventDefault();
    targetName = $(this).data('target')
    lenis.scrollTo(targetName)
})

$('.btn-top').click(function(){
    $('html').animate({scrollTop:0}, 1000);
})


//설해원 이미지효과
gsap.registerPlugin(ScrollTrigger);
gsap.set('.sec-common .gallery-area',{ xPercent:100 })
gsap.set('.sec-common .gallery-area img',{ xPercent:-50 })

let imgShow = gsap.matchMedia();

imgShow.add("(min-width: 1024px)", () => {
    gsap.utils.toArray('.sec-common').forEach(element => {
        items = gsap.timeline({
            scrollTrigger:{
                trigger:element,
                start:"0% 0%",
                end:"100% 100%",
                scrub:0,
                invalidateOnRefresh: true,
                onEnter:function(){
                    $(element).addClass('on')
                },
            },
        })
        
        items.to(element.querySelector('.blank-area'),{ width:0 },'a')
        items.to(element.querySelector('.gallery-area'),{ xPercent:0 },'a')
        items.to(element.querySelectorAll('.gallery-area img'),{ xPercent:0 },'a')
        items.to(element.querySelector('.gallery-item'),{ 
            yPercent:-100,
            y:function(){
                return window.innerHeight;
            }
        })
    });
});
imgShow.add("(max-width: 1023px)", () => {
    gsap.utils.toArray('.sec-common').forEach(element => {
        ScrollTrigger.create({
            trigger:element,
            start:"0% 50%",
            onEnter:function(){
                $(element).addClass('on');
            }
        })
    });
});

ScrollTrigger.create({
    trigger:".sec-issue",
    start:"0% 50%",
    onEnter:function(){
        $('.sec-issue').addClass('show');
    }
})

// 가치슬라이드
const slide2 = new Swiper('.value-slide',{   
    slidesPerView:'auto',
    autoHeight : true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>";
        },
      },
})

// 문의
$(".contact").submit(function(){
    var name = $("#name").val();
    if($('#name').val() == ''){
        alert('이름을 입력해주세요.');
        $('#name').focus();
        return false;
    }else if($('#tel1').val() == ''){
        alert('연락처를 입력해주세요.');
        $('#tel1').focus();
        return false;
    }else if($('#tel2').val() == ''){
        alert('연락처를 입력해주세요.');
        $('#tel2').focus();
        return false;
    }else if($('#tel3').val() == ''){
        alert('연락처를 입력해주세요.');
        $('#tel3').focus();
        return false;
    }else if($('#zipCode').val() == ''){
        alert('주소를 입력해주세요.');
        $('#zipCode').focus();
        return false;
    }else if($('#address2').val() == ''){
        alert('상세주소를 입력해주세요.');
        $('#address2').focus();
        return false;
    }else if(!$("#agreeY").is(":checked")){
        alert('개인정보 수집 및 이용에 대한 동의에 체크해주세요.');
        $('#agreeY').focus();
        return false;
    }else if($('#captcha').val() == ''){
        alert('자동입력방지를 입력해주세요.');
        $('#captcha').focus();
        return false;
    }
});