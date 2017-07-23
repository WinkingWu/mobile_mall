
$(function(){
	$.ajax({
		type:"get",
		url:"admin/data/sort.json",
		async:false,
		success:function(data){
			console.log(typeof data);
			var datatype = typeof data;
			if (datatype == "string") {
				data = JSON.parse(data);
			}
			var prodata = data.pro;
			$("#nav_list ol").html("");
			for(x in prodata){
				var item = '<li class="swiper-slide" data-id="'+x+'"><a href="###">'+prodata[x].title+'</a></li>';
				$("#nav_list ol").append(item);
			}
			$(".nav_list ol li:eq(0)").addClass("on");
			var id = $(".nav_list ol li:eq(0)").data("id");
			console.log(id)
			getContent(id);
		},
		error:function(){
			alert("网络错误，请稍后再试！")
		}
	})
	var mySwiper = new Swiper('#nav_list', {
		freeMode: true,
		freeModeMomentumRatio: 0.5,
		slidesPerView: 'auto',
		nextButton:'.btn_next',
	});
	$(".nav_list li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var id = $(this).data("id");console.log(id)
		getContent(id);
	})
	function getContent(id){
		$.ajax({
			type:"get",
			url:"admin/data/sort.json",
			async:true,
			data:{
				"id":id
			},
			success:function(data){
				console.log(typeof data);
				var datatype = typeof data;
				if (datatype == "string") {
					data = JSON.parse(data);
				}
				var foods = data.pro[id].foods;console.log(foods)
				$(".pro_list ul").html("");
				for (var i=0;i<foods.length;i++) {
					var foodId = foods[i].id;
					var foodTitle = foods[i].title;
					var foodHref = foods[i].href;
					var foodPrice = foods[i].price;
				    var content = '<li><a href="'+foodHref+'"><figure>'+
								  '<img src="img/product_0'+foodId+'.jpg"/><figcaption>'+foodTitle+'</figcaption></figure>'+
								  '</a><p><i>￥'+foodPrice+'</i><s>￥268.00</s></p>'+
								  '<button class="addcat" type="button"><img src="img/cart_icon.png"/>加入购物车</button></li>';
					$(".pro_list ul").append(content);  
				}
			}
		})
	}
	$(".pro_list").on("click",".addcat",function(){
		var goods = null;
		var user = getCookie("login").split('/')[0];
		var goodsId = $(this).siblings("a").attr("href").split("=")[1];
		$.ajax({
			type:"get",
			url:"admin/data/goodsinfo.json",
			async:false,
			dataType:"json",
			success:function(data){
				console.log(typeof data);
				var datatype = typeof data;
				if (datatype == "string") {
					data = JSON.parse(data);
				}
				goods = data["goodsinfo"][goodsId];
				goods.id = goodsId;
				goods.num = 1;
				goods.buy = true;
			}
		});
		if (isLogin()) {
			if (user != "" && goods != null) {console.log("---1---")
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
						if(data.errcode == 0){
							alert("商品已经成功添加到购物车");
						}else{
							alert("商品添加失败，请检查网络");
						}
					}
				});
			}
		} else{
			var r = confirm("您还没登录，是否跳转到登录页？")
			if(r){
				location.href = "login.html";
			}
		}
	})
})
