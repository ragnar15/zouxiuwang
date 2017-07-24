import MyAjax from "./MyAjax";
import AddCart from "./AddCart";
import "./../scss/cart.scss";
export default {
	loadHeader(){
		$("#header").load("views/cart.html #cartHeader",() => {
			console.log("ok")
		})
	},
	loadContent(){
		$("#content").load("views/cart.html #cartContent",() => {
			console.log("ok");
			var userID = localStorage.getItem("userID");
			var url = "http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
			$("#proList").html("<img src='../image/loading.gif' style='width:30px;height:30px'/>");
			MyAjax.fetchJsonp(url,function(data){
				console.log(data)
				$("#proList").html("");
				if(data == "0"){
					$("#proList").html("购物车空空如也");
				}else{
					
					for(var item of data){
						$("#proList").append('<li>'+
							'<div class="proImg">'+
								'<img src="'+item.goodsListImg+'"/>'+
							'</div>'+
							'<div class="proInfo">'+
								'<p class="proTitle">'+item.goodsName+
								'</p>'+
								'<p class="proPrice">'+
									'￥'+item.price+
								'</p>'+
								'<p class="proNumber">'+
									'<input type="button" value="-" />'+
									'<span>'+item.number+'</span>'+
									'<input type="button" value="+" />'+
								'</p>'+
								'<button class="deleteBtn" goodsID="'+item.goodsID+'">删除</button>'+
							'</div>'+
						'</li>')
					}
					
					
					$(".deleteBtn").on("tap",function(){
						var that = this;
						var goodsID = $(this).attr("goodsID");
						//删除数据，然后操作视图----回调函数
						AddCart.deleteCart(goodsID,function(){
							$(that).parent().parent().remove();
						},function(){
							
						});
					})
				}
			},function(err){
				console.log(err)
			})
		})
	}
}
