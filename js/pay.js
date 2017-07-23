$(function(){
	$("#password_box input").bind('input propertychange',function(){
		if (isNaN($(this).val()) || $(this).val()==" ") {
			$(this).val("");
		}
		if ($(this).val()!="") {
			$(this).next("input").focus();
			$(this).attr("data-bool","true");
		}
	})
	$("#password_box input").click(function(){
		$("#password_box input[data-bool='false']:eq(0)").focus();
		
	})
	$("#password_box input").keyup(function(){
		var keycode = event.keyCode;
		if(keycode == 8){
			$(this).prev("input").val("")
			$(this).prev("input").focus();
			$(this).attr("data-bool","false");
		}
	})
	$("#password_box input:eq(5)").bind('input propertychange',function(){
		if ($(this).val() != "") {
			location.href='pay_success.html'
		}
	})
})