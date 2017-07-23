//$(function(){})
$(document).ready(function(){
	var winW = $(window).width();
	/*winW = winW > 375? 375 : winW;*/
	var constant = winW/7.5;
	$('html').css({"font-size":constant});
	$(window).resize(function(){
		var winW = $(window).width();
		var constant = winW/7.5;
		$('html').css({"font-size":constant});
	})
})




