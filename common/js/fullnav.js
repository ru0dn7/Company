
$(document).ready(function() {

    var smh=$('.visual').height();  //비주얼 이미지의 높이를 리턴한다   900px
    var on_off=false;  //false(안오버)  true(오버)
    
        $('#headerArea').mouseenter(function(){
           // var scroll = $(window).scrollTop();
            $(this).css('background','rgba(0, 0, 0, .8)');
            // $('.dropdownmenu li a').css('color','#333'); 
             //헤더영역의 텍스트 색상과 로고이미지 경로 등을 교체
            on_off=true;
        });
    
       $('#headerArea').mouseleave(function(){
            var scroll = $(window).scrollTop();  //스크롤의 거리
            
            if(scroll<smh-100 ){
                $(this).css('background','rgba(0, 0, 0, 0.2)'); 
                // $('.dropdownmenu li a').css('color','#fff');
            }else{
                $(this).css('background','rgba(0, 0, 0, .8)'); 
                // $('.dropdownmenu li a').css('color','#333');
            }
           on_off=false;    
       });
    
       $(window).on('scroll',function(){//스크롤의 거리가 발생하면
            var scroll = $(window).scrollTop();  
            //스크롤의 거리를 리턴하는 함수
            //console.log(scroll);
 
            if(scroll>smh-50){//스크롤이 비주얼의 높이-header높이 까지 내리면
                $('#headerArea').css('background','rgba(0, 0, 0, .8)');
                // $('.dropdownmenu li a').css('color','#333');
            }else{//스크롤 내리기 전 디폴트(마우스올리지않음)
               if(on_off==false){
                    $('#headerArea').css('background','rgba(0, 0, 0, 0.2)');
                    // $('.dropdownmenu li a').css('color','#fff');
               }
            }; 
            
         });
 
   
     //2depth 열기/닫기
     $('ul.dropdownmenu').hover(
        function() { 
           $('ul.dropdownmenu li.menu1 ul').fadeIn('normal',function(){$(this).stop();}); //모든 서브를 다 열어라
           $('#headerArea').animate({height:450},'fast').clearQueue();
           $('.header_inner').css('border-bottom','1px solid #333');
        },function() {
           $('ul.dropdownmenu li.menu1 ul').hide(); //모든 서브를 다 닫아라
           $('#headerArea').animate({height:100},'fast').clearQueue();
           $('.header_inner').css('border','none');
      });
     
      //1depth 효과
      $('ul.dropdownmenu li.menu1').hover(
        function() { 
            $('.depth1',this).css('color','#ac6cb8');
            $('.header_inner').css('border-bottom','1px solid #333');
        },function() {
           $('.depth1',this).css('color','#fff');
           $('.header_inner').css('border','none');
      });
      
 
      //tab 처리
      $('ul.dropdownmenu li.menu1 .depth1').on('focus', function () {
         $('ul.dropdownmenu li.menu1 ul').slideDown('normal');
         $('#headerArea').animate({height:450},'fast').clearQueue();
      });
 
     $('ul.dropdownmenu li.m6 li:last').find('a').on('blur', function () {
         $('ul.dropdownmenu li.menu1 ul').slideUp('fast');
         $('#headerArea').animate({height:100},'normal').clearQueue();
     });
 });
 