
// 첫 번째 서브메뉴 활성화
$('.subNav li:eq(0)').find('a').addClass('spy');

// 스크롤 이벤트
var smh = $('.title_area').height()+400; // 메인 비주얼 높이
// console.log(smh);
var offsets = [];
$('.history_wrap li').each(function(index) {
    offsets[index] = $(this).offset().top - 600; // 각 섹션의 위치를 저장
});

$(window).on('scroll', function() {
    var scroll = $(window).scrollTop();

    // Sticky 메뉴 처리
    if (scroll > smh) {
        $('.navBox').addClass('navOn');
        $('header').hide();
    } else {
        $('.navBox').removeClass('navOn');
        $('header').show();
    }

  
    offsets.forEach(function(offset, index) {
        if (scroll >= offset && scroll < (offsets[index + 1] || Infinity)) {
            $('.subNav li:eq(' + index + ')').find('a').addClass('spy');
            $('.history_wrap li:eq(' + index + ')').addClass('boxMove');
        }
    });
});



    // 각 섹션의 시작 위치 계산
    var sec1Offset = $('.sec1').offset().top- 200; // sec1 위치
    var sec6Offset = $('.sec6').offset().top- 200; // sec6 위치
    var headerOffset = 66; // 헤더 높이 보정값

    // 첫 번째 서브메뉴 활성화
    $('.subNav li:eq(0)').find('a').addClass('spy');

    // 스크롤 이벤트 처리
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        // 서브메뉴 활성화 및 콘텐츠 애니메이션 처리
        $('.subNav li a').removeClass('spy');
        if (scroll >= sec1Offset - headerOffset && scroll < sec6Offset - headerOffset) {
            $('.link1').addClass('spy');
        } else if (scroll >= sec6Offset - headerOffset) {
            $('.link2').addClass('spy');
        }

         // 마지막 섹션 강제 처리 (sec9)
         if (scroll + $(window).height() >= $(document).height()) {
            $('.history_wrap li.sec9').addClass('boxMove');
        }
    });

    // 메뉴 클릭 시 해당 섹션으로 스크롤 이동
    $('.link1').click(function (e) {
        e.preventDefault();
        $('.subNav li a').removeClass('spy'); // 모든 링크에서 spy 제거
        $(this).addClass('spy'); // 클릭된 링크에 spy 추가
        $('html, body').animate({ scrollTop: sec1Offset - headerOffset }, 600);
    });

    $('.link2').click(function (e) {
        e.preventDefault();
        $('.subNav li a').removeClass('spy'); // 모든 링크에서 spy 제거
        $(this).addClass('spy'); // 클릭된 링크에 spy 추가
        $('html, body').animate({ scrollTop: sec6Offset - headerOffset }, 600);
    });


