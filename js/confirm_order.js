$(function(){
	if (isLogin()) {
		var user = getCookie("login").split('/')[0];
		$.ajax({
			type:"get",
			url:"admin/data/order.json",
			async:false,
			success:function(data){
				console.log(typeof data);
				var datatype = typeof data;
				if (datatype == "string") {
					data = JSON.parse(data);
				}
				var order_info = data[user];
				$(".order table").html("");
				var tol_price = 0;
				for (k in order_info) {
					var content = '<tr><td><img src="img/product_0'+order_info[k].imgid+'.jpg"/></td>'+
									'<td>'+order_info[k].title+'</td>'+
									'<td><ol><li>名称：'+order_info[k].model+'</li>'+
									'<li>价格：<i>￥<b class="price">'+order_info[k].price+'</b></i></li>'+
									'<li>数量：<b class="num">'+order_info[k].num+'</b>件</li><li>运费：￥00.00</li>'+
									'</ol></td></tr>';
					tol_price += parseFloat(order_info[k].price);
					$(".order table").append(content);
				}
				var sum = tol_price - parseFloat($(".freight").text())
				$(".sum").text(sum.toFixed(2))
			}
			
		});
	}
	$("#sub_order").click(function(){
		if (isLogin()) {
			var user = getCookie("login").split('/')[0];
			$.ajax({
				type:"get",
				url:"admin/data/order.json",
				async:false,
				success:function(data){
					for (k in data[user]) {
						var type = data[user][k].type;
						console.log(type);
						var gid = data[user][k].id;
						if (type != 1) {
							$.ajax({
								type:"get",
								url:"admin/shop_cart.php",
								async:false,
								data:{
									"type":"delete",
									"user":user,
									"gid":gid
								},
								success:function(data){
									location.href = "pay.html"
								}
							});
						}else{
							location.href = "pay.html"
						}
					}
					
				},
				error:function(){
					alert("网络错误，请检查网络！")
				}
			});
		}
	})
})