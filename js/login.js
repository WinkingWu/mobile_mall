$(function(){
	var reg1 = /user_+/;
	console.log(reg1.test(document.cookie))
	$("#btn_login").click(function(){
		event.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();
		
		var reg_user = /^[a-zA-Z_]\w{5,15}$/;
		var reg_pass = /^[\w!@#$%^&*,.<>]{8,32}$/; 
		var reg_email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.)+(com)$|(net)$|(cn)$/;
		if(user.trim() === "" || !(reg_user.test(user) || reg_email.test(user))){
			$("#username").next("p").text("*请填写正确的用户名!");
			return;
		}
		if(pass.trim() === "" || !reg_pass.test(pass)){
			$("#username").next("p").text("");
			$("#password").next("p").text("*密码不符合格式!");
			return;
		}
		
		//限制按钮
		$("#btn_login").val("登录中...(^_^)").prop("disabled",true);
		if (pass != "$&"+user+"!@#%^$") {
			pass = hex_md5(pass);
		}else{
			pass = getCookie("user").split('/')[1];
		}
		$.ajax({
			type:"post",
			url:"admin/login.php",
			async:true,
			data:{
				"user":user,
				"pass":pass  //提交的密码经过加密
			},
			success:function(msg){
				//恢复按钮
				$("#btn_login").val("登录").prop("disabled",false);
				//json数据转换
				var json = JSON.parse(msg);
				if(json.type == "success"){
//					document.cookie = "login=done;expires="+new Date();
//					localStorage.setItem("user",user);//跨页面验证
//					localStorage.setItem("headimg","img/user/"+user+".jpg");//跨页面验证
					if (json.code == "2") {
						user = json.user;
					}
					setCookie("login",user+"/done",7)
						rememberPass();
					//登录成功操作
					var reg = /(reg.html)$/
					if(reg.test(document.referrer)){
						location.href = "user.html";
					}else{
						history.back();
					}
					
				}else{
					//判断错误情况
					switch(json.code){
						case "1":
							alert("该用户不存在，请检查再输入");
							break;
						case "2":
							$(".log_inp:eq(1)").val("");
							alert("密码错误！");
							break;
						default:
							alert("发生未知错误");
					}
				}
			},
			error:function(){
				$("#btn_login").val("登录").prop("disabled",false);
				alert("服务器连接失败，请检查网络！");
			}
		});
	})
	function getLoginInfo(){
		var info = getCookie("user").split('/');
		var user = info[0];
		var pass ="$&" + info[0]+"!@#%^$";
		if (getCookie("user") != "") {
			$("#username").val(user);
			$("#password").val(pass);
			$("#ckbox").prop("checked",true);
		}
	}
	getLoginInfo()
	function rememberPass(){
		var user = $("#username").val();
		var pass = $("#password").val();
		if($("#ckbox").prop("checked") && pass!="$&"+user+"!@#%^$"){
			//密码不能直接保存在本地中
			//对密码进行加密  md5
			pass = hex_md5(pass);
			var key = "user";
			var val = user+"/"+pass;
			setCookie(key,val,30);//记住密码
		}else if(!$("#ckbox").prop("checked")){
			delCookie("user");
		}
	}
	
})