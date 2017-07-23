$(function(){
	$(".all_select").click(function(){
		$(".cart_list table [type=checkbox]").prop("checked",$(".all_select>input").prop("checked"));
		var sum = 0;
		if ($(".all_select>input").prop("checked")) {
			var len = $(".cart_list table .price").length;
			for (var i=0;i<len;i++) {
				var price = parseFloat($(".price").eq(i).text());
				var num = parseInt($(".num").eq(i).val());
				sum +=price*num;
			}
			$(".sum").text(sum.toFixed(2));
			$(".count").text(len);	
		} else{
			$(".sum").text(sum.toFixed(2));
			$(".count").text(0);
		}
		if(isLogin()){
			//后台提交
			var user = getCookie("login").split('/')[0];
			var bool = $(".all_select>input").prop("checked");console.log(bool)
			if(user != ""){
				//后台提交
				$.ajax({
					type:"get",
					url:"admin/shop_cart.php",
					data:{
						"type":"changebuy",
						"user":user,
						"bool":bool
					},
					dataType:"json",
					success:function(data){
						console.log(data);
					}
				});
			}
		}
	})
	function checkAll(){
		var bool = ($(".cart_list table [type=checkbox]").length == $(".cart_list table [type=checkbox]:checked").length);
		$(".all_select>input").prop("checked",bool);
		$(".count").text($(".cart_list table [type=checkbox]:checked").length);
	}
	
	$(".cart_list").on("click","table [type=checkbox]",function(){
		checkAll();
	})
	if(isLogin()){
		console.log("----1--")
		var user = getCookie("login").split('/')[0];
		$.ajax({
			type:"get",
			url:"admin/shop_cart.php",
			async:false,
			data:{
				"type":"get",
				"user":user
			},
			dataType:"json",
			success:function(data){
				$(".cart_list table").html("");
				for (var k in data) {
					data[k].buy = (data[k].buy == "true");
					new Goods(data[k],$(".cart_list table")[0],$(".sum")[0]);
				}
			}
		})
	}
	checkAll();
	$("#buy").click(function(){
		if (isLogin()) {
			var user = getCookie("login").split('/')[0];
			var len = $(".cart_list table tr").length
			if (len==0) {
				var r = confirm("你当前购物车为空，是否去逛逛？");
				if(r){
					location.href = "homepage.html"
				}
			} else{
				if ($(".cart_list table [type=checkbox]:checked").length == 0) {
					alert("你还没选择商品，请选择商品！");
					return;
				}
				$.ajax({
					type:"get",
					url:"admin/data/shopcat.json",
					async:true,
					success:function(data){
						var user_data = data[user];
						var goods = [];
						for (k in user_data) {
							var buy = user_data[k].buy;
							var str = buy.toString();
							if ($(".all_select>input").prop("checked")) {
								goods.push(user_data[k]);
							} else{
								if (str == "true") {
									 goods.push(user_data[k]);
								}
							}
						}
						console.log(goods)
						$.ajax({
							type:"get",
							url:"admin/sub_order.php",
							async:true,
							dataType:"json",
							data:{
								"type":0,
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
						});
					}
				});
			}
		}else{
			var r = confirm("您还没登录，是否跳转到登录页？")
			if(r){
				location.href = "login.html";
			}
		}
	})
	$(".cart_list table").on("click",".buy",function(){
		if (isLogin()) {
			var user = getCookie("login").split('/')[0];
			var goods = null;
			var goodsid = $(this).parents("tr").find("img").parent().attr("href").split("=")[1];
			console.log(goodsid)
			$.ajax({
				type:"get",
				url:"admin/data/shopcat.json",
				async:false,
				success:function(data){
					goods = data[user][goodsid];
					console.log(goods)
				}
			});
			$.ajax({
				type:"get",
				url:"admin/sub_order.php",
				async:true,
				dataType:"json",
				data:{
					"type":2,
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
			});
		}
	})
})