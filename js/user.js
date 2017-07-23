$(function(){
	var user = getCookie("login").split('/')[0];
	if (user) {
		$(".user .user_name").text(user);
	}
})
