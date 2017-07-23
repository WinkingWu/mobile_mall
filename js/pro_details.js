$(function(){
	$(".details .title li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	var goods = null;
	if(getsearch()["id"] != undefined){
		//初始化商品详情页面
		$.ajax({
			type:"get",
			url:"admin/getgoods.php",
			async:true,
			dataType:"json",
			data:{
				id:getsearch()["id"]
			},
			success:function(data){
				if(data.title){
					//console.log(data);
					$(".title p").html(data.title);
					$(".price").html(data.price);
					$(".int").html(data.int);
					//获取商品信息
					goods = data;
					goods.num = 1;
					goods.buy = true;
					console.log(goods)
				}else{
					alert("数据获取失败");
				}
			},
			error:function(){
				alert("商品数据获取失败，请检查网络是否错误！")
			}
		});
		
	}
	

	
	//加入购物车
	$("#addcat").click(function(){
		console.log(goods)
		//判断用户是否登录
		if(isLogin()){
			//获取用户信息   提高程序的健壮性
			var user = getCookie("login").split('/')[0];
			if(user != "" && goods != null){//判断页面是否异常
				console.log(goods);
				$.ajax({
					type:"get",
					url:"admin/addshopcat.php",
					async:true,
					dataType:"json",
					data:{
						"user":user,
						"goodsinfo":goods
					},
					success:function(data){
						console.log("success")
						if(data.errcode == 0){
							alert("商品已经成功添加到购物车");
						}else{
							alert("商品添加失败，请检查网络");
						}
					}
				})
			}
		}else{
			//用户没有登录  跳转登录页
			var r = confirm("您还没登录，是否跳转到登录页？")
			if(r){
				location.href = "login.html";
			}
//			if(goods != null){
//				//用户没有登录   暂存在本地存储中
//				if(localStorage.getItem(getsearch()["id"])){
//					var g = JSON.parse(localStorage.getItem(getsearch()["id"]));
//					//商品存在
//					goods.num = g.num + 1;
//				}
//				var str = JSON.stringify(goods);
//				localStorage.setItem(getsearch()["id"],str);
//				alert("商品已经成功添加到购物车");
//			}
		}
	});
	
	$("#buy").click(function(){
		//判断用户是否登录
		if(isLogin()){
			//获取用户信息   提高程序的健壮性
			var user = getCookie("login").split('/')[0];
			if(user != "" && goods != null){//判断页面是否异常
				$.ajax({
					type:"get",
					url:"admin/sub_order.php",
					async:false,
					dataType:"json",
					data:{
						"type":1,
						"user":user,
						"goodsinfo":goods
					},
					success:function(data){
						if(data.errcode == 0){
							location.href = "confirm_order.html";
						}else{
							alert("商品购买失败，请检查网络！");
						}
					}
				})
			}
		}else{
			//用户没有登录  跳转登录页
			var r = confirm("您还没登录，是否跳转到登录页？")
			if(r){
				location.href = "login.html";
			}
//			if(goods != null){
//				//用户没有登录   暂存在本地存储中
//				if(localStorage.getItem(getsearch()["id"])){
//					//获取 将字符串转成对象
//					var g = JSON.parse(localStorage.getItem(getsearch()["id"]));
//					//商品存在
//					goods.num = g.num + 1;
//				}
//				//将js对象(json)转成字符串
//				var str = JSON.stringify(goods);
//				//本地存储只能保存字符串
//				localStorage.setItem(getsearch()["id"],str);
//				location.href = "shop_car.html";
//			}
		}
	});
	
})