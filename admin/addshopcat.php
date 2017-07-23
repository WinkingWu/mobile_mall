<?php
	if(isset($_GET["user"])){
		//获取上传的get信息
		$user = $_GET["user"];
		$goodinfo = $_GET["goodsinfo"];
		$goodinfo["num"] = 1;
		$goodinfo["buy"] = "true";
		//读取文件
		$json = file_get_contents("data/shopcat.json");		
		$json = json_decode($json,true);
		
		//判断用户的购物车是否存在商品
		if(@$json[$user] == null){
			//不存在就创建一个购物车
			$json[$user] = array();
			$json[$user][$goodinfo["id"]] = $goodinfo;
			echo $goodinfo;
		}else{
			//存在就对应的添加商品内容
			$u = $json[$user];
			//判断该商品是否已经添加
			if(@$u[$goodinfo["id"]] != null){//添加了就数量加1
				$u[$goodinfo["id"]]["num"] = $u[$goodinfo["id"]]["num"] + 1;
			}else{
				//没有就添加一个新的数据
				$u[$goodinfo["id"]] = $goodinfo;
			}
			//将新的数据赋值到之前的整个数据中
			$json[$user] = $u;
		}
		//数据转换写入到文件中
		$data = json_encode($json);
		$int = file_put_contents("data/shopcat.json", $data);
		//
		if($int > 0){
			//数据写入成功
			echo '{"errcode":"0","errmsg":"ok"}';
		}else{
			echo '{"errcode":"40001","errmsg":"goods insert fail;"}';
		}
			
	}
?>