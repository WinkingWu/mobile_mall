<?php
	if(isset($_GET["id"])){
		$id = $_GET["id"];
		//从文件获取
		$json = file_get_contents("data/goodsinfo.json");
		$json = json_decode($json,true);
		//根据ID提取对应的数据
		$json = @$json["goodsinfo"][$id];
		//判断是否获取成功
		if($json == null){
			echo '{"errcode":"1","errmsg","goods not find"}';
		}else{
			$json["id"] = $id;//$json是关联数组 
			echo json_encode($json);
		}
	}
?>