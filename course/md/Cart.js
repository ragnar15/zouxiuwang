import MyAjax from "./MyAjax.js";
import Toast from "./Toast";
import "./../scss/cart.scss";

import AddCart from "./AddCart.js";
var Cart = {
	loadHeader(){
		$("#header").load("views/cart.html #cartHeader",function(){
			
		})
	},
	loadContent(){
		$("#content").load("views/cart.html #cartContent",function(){
			var userID  = localStorage.getItem("userID");
			var url  = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
			MyAjax.fetchJsonp(url,function(data){
				console.log(data)
				$("#proList").html("");
				if(data == "0"){
					$("#proList").html("购物车空空如也");
				}else{
					for(var item of data){
						Toast.makeText("购物车为空",1000);
						$("#proList").append('<li>'+
				'<div class="proImg">'+
					'<img src = "'+item.goodsListImg+'">'+
				'</div>'+
				'<div class="proInfo">'+
					'<p class="proTitle">'+item.goodsName+						
					'</p>'+
					'<p class="proPrice">'+
						'￥'+item.price+
					'</p>'+
					'<p class="proNumber">'+
						'<input type="button" name="" id="" value="-" />'+
						'<span>'+item.number+'</span>'+
						'<input type="button" name="" id="" value="+" />'+
					'</p>'+
					'<button   class= "deleteBtn" goodsID = "'+item.goodsID+'"   >'+
						'删除'+
					'</button>	'+				
				'</div>'+
			'</li>')
					}
					
					$(".deleteBtn").on("tap",function(){
						var that = this;
						var goodsID = $(this).attr("goodsID");
						AddCart.deleteCart(goodsID,function(){
							$(that).parent().parent().remove();
						});
					})
				}
			},function(err){
				console.log(err);
			})
		})
	}
}
export default Cart;