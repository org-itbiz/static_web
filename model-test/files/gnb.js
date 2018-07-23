$(function () {
	// gnb-pc
	$('#gnb > li > a').on('mouseenter focus', function() {		
		$('#header02').addClass('on');
		$('#gnb > li ').removeClass('on');
		$(this).parent().addClass('on');	
	});

	$('#header02').on('mouseleave', function() {
		$('#header02').removeClass('on');
	});

	var scrollOffsetY = 0; 
	var locationOffsetY = 0;
	var scrollTop = 0;
	var locationOffsetY = 0;
	$(window).on('scroll', function() {		
		scrollFn();
	});
	scrollFn();
	function scrollFn(){		
		scrollTop = $(document).scrollTop();
		if($('#main_visual').length>0){
			scrollOffsetY = $('#main_visual').height();		
		}
		if($('#sub_top').length>0){
			locationOffsetY = $('#sub_top').position().top-60;
		}
		
		if (scrollTop > scrollOffsetY) {
			$("#header").addClass('bg_white');			
		} else {
			$("#header").removeClass('bg_white');
		}
		
		if (scrollTop > locationOffsetY) {
			$("#sub_top").addClass('top_fixed');			
		} else {
			$("#sub_top").removeClass('top_fixed');
		}
	}


	// gnb-mobile
	$('#header_m .btn_open').on('click', function(e) {
		e.preventDefault();
		$('#header_m').addClass('on');	
	});
	$('#header_m .btn_close').on('click', function(e) {		
		e.preventDefault();
		$('#header_m').removeClass('on');	
	});
	$('#header_m .dimmed_bg').on('click', function(e) {		
		e.preventDefault();
		$('#header_m').removeClass('on');	
	});
	
	$('#gnb_m .gnb_list > ul > li > a').on('click', function(e) {		
		e.preventDefault();
		$target = $(this).parent();
		$('#gnb_m .gnb_list > ul > li').not($target).removeClass('on');
		$target.toggleClass('on');
	});
	
	$('#gnb_m .sub > ul > li > a').on('click', function(e) {
		var len = $(this).parent().find('ul').length;
		if(len > 0){
			e.preventDefault();
			$target = $(this).parent();
			$('#gnb_m .sub > ul > li').not($target).removeClass('on');
			$target.toggleClass('on');
		}
	});


});
