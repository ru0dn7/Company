// main visual JS
var timeonoff; //타이머 처리
var imageCount = $(".gallery ul li").size(); //이미지 총개수 5
var cnt = 1; //이미지 순서 1 2 3 4 5 1 2 3 4 5....
var onoff = true; // true=>타이머 동작중 , false=>동작하지 않을때

$(".btn1").css("background", "rgba(255, 255, 255, 0.5)"); // 첫번째 버튼 활성화
$(".btn1").css("width", "150px"); // 첫번째 버튼의 너비 증가
$(".btn1").addClass('on');

$(".gallery .link1").fadeIn("fast"); //첫번째 이미지 보이게
$(".gallery .link1 span:eq(0)").delay(1000).animate({ top: '35%', opacity: 1 }, "slow");
$(".gallery .link1 span:eq(1)").delay(1500).animate({ top: "45%", opacity: 1 }, "slow");

function gallery_change() {
  $(".gallery li").fadeOut("300"); //모든 이미지 숨김
  $(".gallery .link" + cnt).fadeIn("400"); // 해당순서 이미지 보이게

  $(".mbutton").css("background", "rgba(255, 255, 255, 0.5)"); //모든 버튼 비활성화
  $(".mbutton").css("width", "20px");
  $(".mbutton").removeClass("on");
  $(".btn" + cnt).addClass("on");
  $(".btn" + cnt).css("background", "rgba(255, 255, 255, 0.5)"); //자신 버튼만 활성화
  $(".btn" + cnt).css("width", "150px");

  $(".gallery li span").css("top", 480).css("opacity", 0);
  $(".gallery .link" + cnt)
    .find("span:eq(0)")
    .delay(1000)
    .animate({ top: '35%', opacity: 1 }, "slow");
  $(".gallery .link" + cnt)
    .find("span:eq(1)")
    .delay(1500)
    .animate({ top: "45%", opacity: 1 }, "slow");
  }

function moveg() {
  if (cnt == imageCount + 1) cnt = 1;
  if (cnt == imageCount) cnt = 0; //카운트 초기화

  cnt++; //카운트 1씩 증가.. 
  //1 2 3 4 5   1 2 3 4 5..
  gallery_change();

  if (cnt == imageCount) cnt = 0; // 마지막 순서 이후 카운트의 초기화 0
}

timeonoff = setInterval(moveg, 4000); // 타이머를 동작 1~5이미지를 순서대로 자동 처리
//var 변수 = setInterval( function(){처리코드} , 4000);  
//clearInterval(변수); 

$(".mbutton").click(function (event) {//각각의 버튼 클릭시
  
  var $target = $(event.target); //클릭한 버튼 $target == $(this)
  clearInterval(timeonoff); //타이머 중지

  cnt = $(this).index(".mbutton") + 1; //0~4 ->1~5
  // console.log(cnt);

  gallery_change();

  if (cnt == imageCount) cnt = 0; //  카운트 초기화

  timeonoff = setInterval(moveg, 4000); //  타이머의 부활

  if (onoff == false) {
    //중지 상태라면
    onoff = true; // 동작
    $(".ps").html('<span class="hidden">stop</span><i class="fa-regular fa-circle-pause"></i>');
  }
});

//stop/play 버튼 클릭시 타이머 동작/중지
$(".ps").click(function () {
  if (onoff == true) {
    // 타이머가 동작 중이라면
    clearInterval(timeonoff); // stop버튼 클릭시
    $(this).html('<span class="hidden">play</span><i class="fa-regular fa-circle-play"></i>');
    onoff = false; //중지
  } else {
    // false 타이머가 중지 상태라면
    timeonoff = setInterval(moveg, 4000); //  play버튼 클릭시  부활
    $(this).html('<span class="hidden">stop</span><i class="fa-regular fa-circle-pause"></i>');
    onoff = true; //  동작
  }
});

//왼쪽/오른쪽 버튼 처리
$(".visual .btn").click(function () {
  clearInterval(timeonoff); 

  if ($(this).is(".btnRight")) {
    // 오른쪽 버튼 클릭 1 2 3 4 5
    if (cnt == imageCount) cnt = 0; //카운트가 마지막 번호까지 가면 0 으로
    //if(cnt==imageCount+1)cnt=1;
    cnt++; //카운트 1씩증가
  } else if ($(this).is(".btnLeft")) {
    //왼쪽 버튼 클릭 5 4 3 2 1
    if (cnt == 1) cnt = imageCount + 1; // 1->6  만들고 6에서 다시 54321
    if (cnt == 0) cnt = imageCount; //0->5 만들고 4321로 감소
    cnt--; //카운트 감소
  }

  gallery_change();

  timeonoff = setInterval(moveg, 4000); //부활

  if (onoff == false) {
    onoff = true;
    $(".ps").html('<span class="hidden">stop</span><i class="fa-regular fa-circle-stop"></i>');
  }
});




//section1 menu slide JS

//section2 membership slide JS

//section3 FRANCHISE slide JS
$('.img_box li:eq(0)').css('filter','grayscale(0)') // 시작 시 첫번째 이미지 컬러화
$('.img_box li').click(function(e){ // 각각의 버튼에 마우스 올리면
    e.preventDefault(); 
    $('.img_box li').css('filter','grayscale(1)') //모든 li 흑백
    var ind = $(this).index('.img_box li');
    // console.log(ind);// 0 1 2 3 

    $('.franchise_left img').attr('src','./images/franchise_big0'+(ind +1)+'.png');   // hover의 버튼에 해당되는 배경 이미지를 불러옴
    $('.franchise_left img').hide().fadeIn('slow');    
    $(this).css('filter','grayscale(0)') // hover의 li만 filter 0
});

//section4 social JS

//section5 company bg JS
$('.company_right li').hover(
  function() {
      var index = $(this).index(); // li의 순서를 가져옴 (0부터 시작)
      var newBackground = `../images/bg_brand0${index + 1}.png`; // index를 기반으로 이미지 경로 생성
      $('.company').css('background-image', `url(${newBackground})`); // 배경 이미지 설정
  }, 
  function() {
      $('.company').css('background-image', ''); // 배경 이미지 초기화
  }
);

//section6 community bg JS