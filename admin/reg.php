<?php
	$file = file_get_contents("data/user.json");
	$obj = json_decode($file);
	foreach($obj->userinfo as $el){
		if($el->user === $_POST["user"]){
			echo '{"type":"error","code":"1"}';//代表用户名重复
			exit;
		}
		if($el->email === $_POST["email"]){
			echo '{"type":"error","code":"2"}';//代表邮箱已经被注册
			exit;
		}
	}
	$user = array("user"=>$_POST["user"],"pass"=>$_POST["pass"],"email"=>$_POST["email"]);
	$obj ->userinfo[] = $user;
	file_put_contents("data/user.json", json_encode($obj));
	echo '{"type":"success","code":"1"}';
?>