<?php
	if($_GET["type"] != 0){
		//获取上传的get信息
		$user = $_GET["user"];
		$goodinfo = $_GET["goodsinfo"];
		$goodinfo["state"] = "failure";
		$goodinfo["type"] = $_GET["type"];
		//读取文件
		$json = file_get_contents("data/order.json");		
		$json = json_decode($json,true);
		
		//判断用户的购物车是否存在商品
		if(@$json[$user] == null){
			//不存在就创建一个购物车
			$json[$user] = array();
			$json[$user][$goodinfo["id"]] = $goodinfo;
		}else{
			//存在就替换掉旧商品内容
			$arr = array();
			$arr[$goodinfo["id"]] = $goodinfo;
			$json[$user] = $arr;
		}
		//数据转换写入到文件中
		$data = json_encode($json);
		$int = file_put_contents("data/order.json", $data);
		//
		if($int > 0){
			//数据写入成功
			echo '{"errcode":"0","errmsg":"ok"}';
		}else{
			echo '{"errcode":"40001","errmsg":"goods insert fail;"}';
		}
			
	}else{
		$user = $_GET["user"];
		$json[$user] = array();
		$data = json_encode($json);
		$int = file_put_contents("data/order.json", $data);
		foreach($_GET["goodsinfo"] as $key){
			$goodinfo = $key;
			$goodinfo["state"] = "failure";
			$goodinfo["type"] = 0;
			$json = file_get_contents("data/order.json");		
			$json = json_decode($json,true);
			
			//存在就替换掉旧商品内容
			$json[$user][$goodinfo["id"]] = $goodinfo;
				
			//数据转换写入到文件中
			$data = json_encode($json);
			$int = file_put_contents("data/order.json", $data);
		}
		
		//
		if($int > 0){
			//数据写入成功
			echo '{"errcode":"0","errmsg":"ok"}';
		}else{
			echo '{"errcode":"40001","errmsg":"goods insert fail;"}';
		}
	}
?>