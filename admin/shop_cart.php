<?php
	if(isset($_GET["type"])){
		switch($_GET["type"]){
			case "get":
				getData();
				break;
			case "change":
				changeData();
				break;
			case "delete":
				deleteData();	
				break;
			case "changebuy":
				changebuy();
			default:
				break;
		}
	}
	
	function getData(){
		$user = $_GET["user"];//
		$shop = file_get_contents("data/shopcat.json");
		$shop = json_decode($shop,true);
		$data = $shop[$user];//获取对应用户的购物车
		echo json_encode($data);//返回数据
	}
	
	
	function changeData(){
		$user = $_GET["user"];//
		$gid = $_GET["gid"];//
		$ginfo = $_GET["goodsinfo"];//
		//读取购物车
		$shop = file_get_contents("data/shopcat.json");
		$shop = json_decode($shop,true);
		$shop[$user][$gid] = $ginfo;
		$shop = json_encode($shop);
		$int = file_put_contents("data/shopcat.json", $shop);
	}
	
	
	function deleteData(){
		$user = $_GET["user"];//
		$gid = $_GET["gid"];//
		//读取购物车
		$shop = file_get_contents("data/shopcat.json");
		$shop = json_decode($shop,true);
		unset($shop[$user][$gid]);
		$shop = json_encode($shop);//,JSON_UNESCAPED_UNICODE
		$int = file_put_contents("data/shopcat.json", $shop);
	}
	
	function changeBuy(){
		$user = $_GET["user"];
		$bool = $_GET["bool"];
		$shop = file_get_contents("data/shopcat.json");
		$shop = json_decode($shop,true);
		$usergoods = $shop[$user];
		if($bool == "true"){
			foreach($usergoods as $goods){
				@$goods["buy"]="true";
				$gid = $goods["id"];
				$shop[$user][$gid] = $goods;
			}
			$shop = json_encode($shop);
			$int = file_put_contents("data/shopcat.json", $shop);
		}else{
			foreach($usergoods as $goods){
				@$goods["buy"]="false";
				$gid = $goods["id"];
				$shop[$user][$gid] = $goods;
			}
			$shop = json_encode($shop);
			$int = file_put_contents("data/shopcat.json", $shop);
		}
	}
?>