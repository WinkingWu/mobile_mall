$(function(){
	function clearForm(){
		$("#username").val("");
		$("#password").val("");
		$("#con_password").val("");
		$("#email").val("");
		$("#check_email").val("");
		$("#code").val("");
	}
	
	$("#btn_reg").click(function(){
		event.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();
		var cpass = $("#con_password").val();
		var email = $("#email").val();
		var cemail = $("#check_email").val();
		var code = $("#code").val();
		
		var reg_user =  /^[a-zA-Z_]\w{5,15}$/;
		var reg_pass = /^[\w!@#%^&*,.<>]{8,20}$/; 
		var reg_email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.)+(com)$|(net)$|(cn)$/;
		var reg_code = /^[a-zA-Z\d]{4}$/;
		
		
		if(user.trim() === "" || !reg_user.test(user)){
			$("#username").next("p").text("*不能以数字开头，长度为6到16个字符!");
			return;
		}
		$("#username").next("p").text("");
		if(pass.trim() === "" || !reg_pass.test(pass)){
			$("#password").next("p").text("*密码为8个以上字符!");
			return;
		}
		$("#password").next("p").text("");
		if(cpass.trim() === ""){
			$("#con_password").next("p").text("*请填写确定密码!");
			return;
		}
		$("#con_password").next("p").text("");
		if(email.trim() === "" || !reg_email.test(email)){
			$("#email").next("p").text("*请填写正确的邮箱");return;
		}
		$("#email").next("p").text("");
		if(cemail.trim() === ""){
			$("#check_email").next("p").text("邮箱验证错误");return;
		}
		$("#check_email").next("p").text("");
		if(code.trim() === "" || !reg_code.test(code)){
			$("#code").next("p").text("验证码格式不对");
			return;
		}
		$("#code").next("p").text("");
		if(!$("input[type='checkbox']").prop("checked")){
			$(".box label").next("p").text("请阅读并同意《服务协议》和《隐私协议》");
			return;
		}
		$(".box label").next("p").text("");
		if(pass != cpass){
			$("#con_password").next("p").text("*你输入的密码不一致，请重新输入");
			return;
		}
		$("#con_password").next("p").text("");
		$("#btn_reg").val("注册中...").prop("disabled",true);
		
		$.ajax({
			type:"post",
			url:"admin/reg.php",
			async:true,
			data:{
				"user":user,
				"pass":pass,
				"email":email
			},
			success:function(data){
				$("#btn_reg").val("注册").prop("disabled",false);
				var result = JSON.parse(data);
				if (result.type === "error") {
					switch(result.code){
						case "1":
							alert("该用户已经被注册");
							break;
						case "2":
							alert("邮箱已经被使用");
							break;
						default:
							alert("发生未知错误，code：" + result.code);
					}
				}else{
					alert("注册成功");
					clearForm();
					location.href = "login.html";
				}
			},
			error:function(){
				alert("服务器连接失败，请稍后再试！");
				$("#btn_reg").val("注册").prop("disabled",false);
			}
		});
	})
})