
$(function(){
	$.ajax({
		type:"get",
		url:"admin/data/sort.json",
		async:false,
		success:function(data){
			var sort = data.sort;
			for(x in sort){
				var item = '<li class="swiper-slide" data-id="'+x+'"><a href="###">'+sort[x].title+'</a></li>'
				$(".nav_list ol").append($(item));
			}
			$(".nav_list ol li:eq(0)").addClass("on");
			var id = $(".nav_list ol li:eq(0)").data("id");
			getContent(id);
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
				var foods = data.sort[id].foods;
				$(".pro_list ul").html("");
				for (var i=0;i<foods.length;i++) {
					var foodId = foods[i].id;
					var foodTitle = foods[i].title;
					var foodHref = foods[i].href;
					var foodPrice = foods[i].price;
				    var content = '<li><a href="'+foodHref+'"><figure>'+
								  '<img src="img/product_0'+foodId+'.jpg"/><figcaption>'+foodTitle+'</figcaption></figure>'+
								  '</a><p><i>￥'+foodPrice+'</i><s>￥268.00</s></p>'+
								  '<button type="button"><img src="img/cart_icon.png"/>加入购物车</button></li>';
					$(".pro_list ul").append(content);  
				}
			}
		})
	}
})
