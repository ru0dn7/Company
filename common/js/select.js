
$(document).ready(function() {   	
	// $('.select .arrow').click(function(){
	// 	$('.select .aList').fadeIn('slow');			  
	// });

	// $('.select .aList').mouseleave(function(){
	// 	$(this).fadeOut('fast');			  
	// });
  
	$('.select .arrow').toggle(function(){  //  홀수번째 클릭 시
		$('.select .aList').fadeIn('slow');	
		$(this).children('span').html('<i class="fa-solid fa-chevron-down"></i>');	
	},function(){ // 짝수번째 클릭 시
        $('.select .aList').fadeOut('fast');	
		$(this).children('span').html('<i class="fa-solid fa-chevron-up"></i>');	        
	});    

    // $("*").click(function(){
    //     $(".select .aList").fadeOut('fast');
    //     $(this).children('span').html('<i class="fa-solid fa-chevron-up"></i>');	
    // })

	//tab키 처리
	//   $('.select .arrow').on('focus', function () {        
    //           $('.select .aList').fadeIn('slow');	
    //    });
    //    $('.select .aList li:last a').on('blur', function () {        
    //           $('.select .aList').fadeOut('fast');
    //    }); 
});