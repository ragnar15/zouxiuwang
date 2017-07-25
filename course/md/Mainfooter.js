
import Home from "./Home.js";
import Kind from "./Kind.js";
import Cart from "./Cart.js";

import User from "./User.js";
import More from "./More.js";
import MyAjax from "./MyAjax.js";
import Login from "./Login.js";

export default{
	loadFooterStyle(idx){
		$("#footer").find("li").eq(idx).addClass("active").siblings().removeClass("active");
	},
	loadfooter(idx){
		
		
				$("#footer").load("views/mainfooter.html ",function(){
						$("#footer").find("li").on("tap",function(){
				var index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				
				switch (index){
						case 0:
					//console.log("首页");
					//$("#content").html("首页");
					Home.loadHeader();
					Home.loadContent();
					
						break;
						case 1:
					//console.log("分类");
					//$("#content").html("分类");
					
					Kind.loadHeader();
					Kind.loadContent();
						break;
						case 2://如果登陆成功显示购物车数据。如果没有成功。跳转登录界面；
					
//					if(localStorage.getItem("isLogin") == "1"){
//						//alert("可以加入购物车")
//						Cart.loadHeader();
//					    Cart.loadContent();
//						var goodsID = $(this).attr("goodsID");
//						var userID = localStorage.getItem("userID");
//						var obj = {
//							url:"http://datainfo.duapp.com/shopdata/updatecar.php?callback=",
//							data:{
//								userID:userID,
////								goodsID:goodsID,
////								number:1
//							},
//							dataType:"JSONP"
//						}
//						MyAjax.zeptoAjax(obj,function(data){
//							if(data == "0"){
//								alert("没有商品")
//							}else{
//								console.log("cart",data);
//							}
//						})
//						
//					}else{
////						alert("请先登录")
//						Login.loadHeader("cart");
//					    Login.loadContent("cart");
//					    $("#footer").css("display","block");
//					}
////					Cart.loadHeader();
////					Cart.loadContent();



						if(localStorage.getItem("isLogin") == "1"){
							Cart.loadHeader();
							Cart.loadContent();
						}else{
							Login.loadHeader("cart");
							Login.loadContent("cart");
							$("#footer").css("display","none")
						}

						break;
						case 3:
					//console.log("我的秀");
					User.loadHeader();
					User.loadContent();
						break;
						case 4:
					//console.log("更多");
					
					More.loadHeader();
					More.loadContent();
						break;		
					default:
						break;
				}
			})
		})
	}
}
