$(function () {
	// 모션
	new WOW().init();

	

	// 메인 팝업 열기
	openMainPop(1);
	openMainPop(2);
	
	$('#pop1 .btn_close2').bind('click',function(e){
		e.preventDefault();		
		// 메인 팝업 닫기
		closeMainPop(1);
	});
	$('#pop2 .btn_close2').bind('click',function(e){
		e.preventDefault();		
		// 메인 팝업 닫기
		closeMainPop(2);
	});
	
	$('#location .menu > a').bind('click',function(e){
		e.preventDefault();
		$('#location > li').not($(this).parent()).find('.sub').slideUp();
		$('#location > li').not($(this).parent()).removeClass('on');
		$(this).parent().find('.sub').slideToggle();
		$(this).parent().toggleClass('on');
	});

	

	var banner_slider;
	var banner_max=0;

	function startSlider(){
		var tw = $(window).width();
		var num;
		var slideWidth;
		banner_max = $('#banner_slider ul li').length;
		
		if(tw<=767){
			num = 2;
			slideWidth = $('#banner_slider').width()/2;			
		}else{
			num = 4;
			slideWidth = $('#banner_slider').width()/4;			
		}
		if(banner_max<=num){
			$('#banner_slider .slider_wrap').css({'maxWidth':slideWidth*banner_max});
		}

		banner_slider = $('#banner_slider ul').bxSlider({		
			auto : false,	
			controls : true,
			pager:false,
			responsive :true,
			minSlides : 1,
			maxSlides : num,
			slideWidth :slideWidth,
			moveSlides : 1,
			
		});
		$('#banner_slider').bind('click',function(e){
			//e.preventDefault();
			//banner_slider.stopAuto();
			//banner_slider.startAuto();
		});
	}
	startSlider();
	function sliderResizeFn(){
		if($('#banner_slider').length>0){		
			var tw = $(window).width();
			var num;
			var len = $('#banner_slider ul li').length;
			if(tw<=767){
				num = 2;				
				slideWidth = $('#banner_slider').width()/2;				
			}else{
				num = 4;
				slideWidth = $('#banner_slider').width()/4;			
			}
			if(banner_max<=num){
				$('#banner_slider .slider_wrap').css({'maxWidth':slideWidth*banner_max});
			}
			banner_slider.reloadSlider({
				auto : false,	
				controls : true,
				pager:false,
				responsive :true,
				minSlides : 1,
				maxSlides : num,
				moveSlides : 1,				
				slideWidth : slideWidth,
			});
		}
		
		if($('#prd_slider').length>0){	
			prd_slider.reloadSlider({
				auto : false,	
				controls : true,		
				pager:false,
			});
		}
	}

	$(window).on('resize', function(){
		sliderResizeFn();
	});
	

	var prd_slider = $('#prd_slider ul').bxSlider({		
		auto : false,	
		controls : true,		
		pager:false,
	});


	$('.depth4_tab_menu_m > a').bind('click',function(e){
		e.preventDefault();
		$('.depth4_tab_menu_m ul').slideToggle();
	});

	
	$('.tab_menu01_m > a').bind('click',function(e){
		e.preventDefault();
		$('.tab_menu01_m ul').slideToggle();
	});


	var fileTarget = $('.filebox .upload_hidden'); 
	fileTarget.on('change', function(){ // 값이 변경되면 
		if ($("#attach").val() == '') {
			var filename = "";
		} else if (window.FileReader) { // modern browser 
			var filename = $(this)[0].files[0].name; 
		} else { // old IE 
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
		} // 추출한 파일명 삽입 
		$(this).siblings('.upload_name').val(filename); 
	});

	$('.btn_pop').on('click',function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		var cls = $(this).attr('data-pop-class');
		$(id).css('display','block');

		if(cls){
			$(id).find('.box').css('display','none');
			$(id).find('.box.'+cls).css('display','block');
		}
		var b = $(this).hasClass('pos_abs');
		if(b){
			var ty = $(window).scrollTop()+100;
			$(id).css('top',ty+'px');
		}
	});
	$('.btn_close').on('click',function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		$(id).css('display','none');
	});

	$('.btn_section_move').on('click',function(e){
		e.preventDefault();		
		var id = $(this).attr('href');
		var ty;
		var tw = $(window).width();
		if(tw>=1000){
			ty = $(id).offset().top-150;
		}else{
			ty = $(id).offset().top-120;
		}
		$('html,body').animate({scrollTop:ty+"px"});

	});
	
	
	$('#family_site > a').on('click',function(e){
		e.preventDefault();
		$('#family_site').toggleClass('on');
		$('#family_site ul').slideToggle();
	});

	$('.btn_privacy').on('click',function(e){
		e.preventDefault();
		$('#policy').css('display','block');
		$('#policy .box').css('display','none');
		$('#privacy').css('display','block');
		var ty = $(window).scrollTop();
		$('#policy').css('top',ty+'px');
	});
	$('.btn_email').on('click',function(e){
		e.preventDefault();
		$('#policy').css('display','block');
		$('#policy .box').css('display','none');
		$('#email').css('display','block');
		var ty = $(window).scrollTop();
		$('#policy').css('top',ty+'px');
	});
	$('.btn_total').on('click',function(e){
		e.preventDefault();
		$('html,body').scrollTop(0);
		$('#sitemap').css('display','block');		
	});
	$('#sitemap .btn_pclose').on('click',function(e){
		e.preventDefault();		
		$('#sitemap').css('display','none');
	});

});


(function( $ ) {

	$.fn.listMoreInit = function(option) {
		
		var $this = this;	
		var size = option.size;
		var curPage = 0;
		var totalPage = 0;
		var max = 0;


		function config(){
			max = $this.find('li').length;
			totalPage = Math.ceil(max/size);
			$('.list_more').on('click',function(e){				
				e.preventDefault();
				moreList();				
			});
			moreList();
		}
		function moreList(){			
			if(curPage<totalPage){
				curPage++;
			}
			var total = curPage*size;			
			$this.find('li').each(function(index,item){
				if(index<total){
					$(this).css('display','block');
				}else{
					$(this).css('display','none');
				}
			});

			if(total>=max){
				$('.list_more').css('display','none');
			}
		}
		config();

    };




	$.fn.caseListInit = function() {
		
		var $this = this;
		var case_slider;

		function config(){
			$this.find('li a').on('click',function(e){
				e.preventDefault();
				$('#sub_pop02').css('display','block');

				var ty = $(window).scrollTop();
				$('#sub_pop02').css('top',ty+'px');
				viewPop($(this).parents('li'));
			});
		}
		function viewPop($target){			
			var img_src = $target.attr('data-detail-img');
			var ary = $target.attr('data-detail-img').split(',');
			var str = "";
			
			for(var i=0; i<ary.length; i++){
				str += "<li><img src='"+ary[i]+"'/></li>";
			}		
			var cont = $target.find('.ovr_info').html();
			$('#sub_pop02.case .cont').html(cont);
			$('#case_slider ul').empty();
			$('#case_slider ul').append(str);
			
			
			if(!case_slider){
				case_slider = $('#case_slider ul').bxSlider({		
					auto : false,	
					controls : true,
					pager:false,		
				});
			}else{
				case_slider.reloadSlider({
					auto : false,	
					controls : true,
					pager:false,
				});				
			}
		}
		config();

    };


})( jQuery );

//쿠키 생성
function setCookie(cName, cValue, cDay) {
  var expire = new Date();
  expire.setDate(expire.getDate() + cDay); // 생성 쿠키가 삭제될 날짜
  expire.setHours(0); // 삭제될 날짜의 시간을 0시로 초기화
  expire.setMinutes(0); // 삭제될 날짜의 시간을 0분으로 초기화
  expire.setSeconds(0); // 삭제될 날짜의 시간을 0초로 초기화

  cookies = cName + '=' + escape(cValue) + '; path=/ ';

  if  ( typeof cDay != 'undefined' )
       cookies += ';expires=' + expire.toGMTString() + ';';

  document.cookie = cookies;
}

//쿠키 가져오기
function getCookie(cName) {
  cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';

  if  ( start != -1 )  { // 해당 쿠키명이 있을 경우
       start += cName.length;
       var end = cookieData.indexOf(';', start);

       if  ( end == -1 )
            end = cookieData.length;

       cValue = cookieData.substring(start, end); // 쿠키 값 조회
  }

  return unescape(cValue);
}

//메인 팝업 열기
function openMainPop(no) {
	if  ( getCookie("mainPop" + no) == 'Y' )  {
		$("#pop" + no).hide();
	}
	else  {
		$("#pop" + no).show();
	}
}

//메인 팝업 닫기
function closeMainPop(no) {
	// 보이지 않기 체크시 쿠키 생성
	if  ( $("#close_chk" + no).is(":checked") )  {
		setCookie("mainPop" + no, "Y", 1);
	}
	
	$("#pop" + no).hide();
}


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
	   return null;
	}
	else{
	   return results[1] || 0;
	}
}

function contentMove(){
	var id = $.urlParam('pos');		
	var ty;
	var tw = $(window).width();
	if(tw>=1000){
		ty = $('#'+id).offset().top-150;
	}else{
		ty = $('#'+id).offset().top-120;
	}
	$('html,body').animate({scrollTop:ty+"px"},500);
}