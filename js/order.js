$(function(){
	$(".order_title li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
})