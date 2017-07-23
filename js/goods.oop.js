!function(window){
	//构造函数模式
	function Goods(data,parent,sum){
		if(typeof data === "object"){
			this.data = data;
			this.parent = parent;
			this.sum = sum;
			this.init();	
		}
	}
	
	Goods.prototype.init = function(){
		this.initsum();
		this.createObj();
		this.initEvent();
	}
	
	Goods.prototype.createObj = function(){
		var data = this.data;
		//创建tr
		var tr = document.createElement("tr");
		tr.innerHTML = '<td class="select"><input type="checkbox" name="" id="" value="" /></td>'+
						'<td><a href="pro_details.html?id='+data.id+'"><img src="img/product_0'+data.imgid+'.jpg"/></a></td>'+
						'<td class="parameter"><h3><a href="pro_details.html?id='+data.id+'">'+data.model+'</a></h3><i>￥<b class="price">'+data.price+'</b></i><p><a href="pro_details.html?id='+data.id+'">'+data.title+'</a></p></td>'+
						'<td class="buy_num"><button class="sub">-</button><input class="num" type="text" value="'+data.num+'" maxlength="2"/><button class="add">+</button></td>'+
					    '<td class="para_btn"><a class="buy" href="###">立即购买</a><a class="del" href="###">删除商品</a></td>';
		
		//设置复选框
		var cb = tr.getElementsByTagName("input")[0];
		cb.checked = data.buy;
		
		this.parent.appendChild(tr);
		this.tr = tr;//保存tr对象
	}
	//初始化事件
	Goods.prototype.initEvent = function(){
		var sub = this.tr.querySelector(".sub");
		var add = this.tr.querySelector(".add");
		var num = this.tr.querySelector(".num");
		var del = this.tr.querySelector(".del");
		var cb = this.tr.getElementsByTagName("input")[0];
		var that = this;
		//减
		sub.onclick = function(){
			//获取当前框内的值
			var count = parseInt(num.value);
			if(--count < 1){
				count = 1;
				return;
			}
			num.value = count;
			that.data.num = count;
			//价格修改
			var price = parseInt(that.sum.innerHTML);
			//原本的价格减掉现在当前数据的单价
			if(that.data.buy == true){
				that.changeSum(-parseFloat(that.data.price));
			}
			//修改存储的数据
			changeData(that.data);
		}
		var oldcount = 0;
		num.onfocus = function(){
			oldcount = parseInt(num.value)
		}
		//num值改变时
		num.onblur = function(){
			var count = parseInt(num.value);
			if (isNaN(count) || count == "" || count<1) {
				count = 1;
			}
			num.value = count;
			that.data.num = count;
			var newcount = count - oldcount;
			//修改整体的价格
			if(that.data.buy == true){
				console.log(parseInt(that.data.price)*newcount)
				that.changeSum(parseFloat(that.data.price)*newcount);
			}
			//修改存储的数据
			changeData(that.data);
		}
		//加
		add.onclick = function(){
			var count = parseInt(num.value);
			if(++count > 99){
				count = 99;
				return;
			}
			num.value = count;
			that.data.num = count;
			//修改整体的价格
			if(that.data.buy == true){
				that.changeSum(parseFloat(that.data.price));
			}
			//修改存储的数据
			changeData(that.data);
		}
		//删除元素
		del.onclick = function(){
			var r = confirm("是否删除该商品？");
			if(r){
				that.parent.removeChild(that.tr);
				//$(that.tr).remove();
				if(that.data.buy == true){
					var price = parseFloat(that.data.price) * that.data.num;	
					that.changeSum(-price);
					var cou = document.getElementsByClassName("count")[0];
					var num = cou.innerHTML;
					num = num-1;
					cou.innerHTML=num;
				}else{
					var parent = document.getElementsByClassName("select");
					var len = parent.length;
					var selallPa = document.getElementsByClassName("all_select")[0];
					var allsel = selallPa.childNodes[1];console.log(allsel)
					allsel.checked=true;
					for (var i=0;i<len;i++) {
						var check = parent[i].childNodes[0].checked;console.log(check)
						if (!check) {
							allsel.checked=false;
						}
					}
				}
				//删除保存的数据
				deleteData(that.data);
			}
		}
		//勾选复选框
		cb.onclick = function(){
			//修改是否购买
			that.data.buy = cb.checked;
			changeData(that.data);
			//获取当前商品的总价
			var price = parseFloat(that.data.price) * that.data.num;
			//判断是否购买
			if(that.data.buy == true){console.log(that.data.buy)
				that.changeSum(price);
			}else{
				that.changeSum(-price);
			}
		}
	}
	
	//初始化页面的价格
	Goods.prototype.initsum = function(){
		if(this.data.buy == true){
			//修改总价
			this.changeSum(parseFloat(this.data.price) * this.data.num);
		}
	}
	
	//修改页面的总价
	Goods.prototype.changeSum = function(price){
		var sum = parseFloat(this.sum.innerHTML);
		sum += price;
		this.sum.innerHTML = sum.toFixed(2);	
	}
	
	
	//修改购物车的数据
	function changeData(data){
		if(isLogin()){
			var user = getCookie("login").split('/')[0];
			if(user != ""){
				//后台提交
				$.ajax({
					type:"get",
					url:"admin/shop_cart.php",
					data:{
						"type":"change",
						"user":user,
						"gid":data.id,
						"goodsinfo":data
					},
					dataType:"json",
					success:function(data){
						console.log(data);
					}
				});
			}
		}
	}
	
	//删除数据
	function deleteData(data){
		if(isLogin()){
			//后台提交
			var user = getCookie("login").split('/')[0];
			if(user != ""){
				//后台提交
				$.ajax({
					type:"get",
					url:"admin/shop_cart.php",
					data:{
						"type":"delete",
						"user":user,
						"gid":data.id
					},
					dataType:"json",
					success:function(data){
						console.log(data);
					}
				});
			}
		}
	}
	
	
	window.Goods = Goods;
}(window);
