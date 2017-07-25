import "./../scss/home.scss";
import MyAjax from "./MyAjax.js";


import Search from "./Search.js";

import "./../scss/proList.scss";
import  login from "./Login.js";

import Cart from "./Cart.js";
import Detail from "./Detail.js";
import AddCart from "./AddCart.js";


var Home = {
	loadHeader(){
		$("#header").load("views/home.html #homeHeader",function(){
			console.log("0k")
		})
	},
	
	
	loadContent(){
		$("#content").load("views/home.html #homeContent",function(){
			console.log("0k",1111)
			$("#goSearch").on("tap",function(){
				Search.loadHeader();
				Search.loadContent();
				Search.loadFooter();
				$("#footer").css("height",0);
			})
			
			//静态轮播图   遇到ajax请求  放在for循环之后；下边代码换位置
//			var mySwiper = new Swiper("#homeBanner",{
//				pagination:".swiper-pagination",
//			    autoplay:3000,            
//			    loop:true,
//				autoplayDisableOnInteraction:false
//				
//				//http://datainfo.duapp.com/shopdata/datainfo.html
//			})
			
			//请求ajax;
			var bannerData  = {
				url :' http://datainfo.duapp.com/shopdata/getBanner.php?callback= ',//callback和等号之间不能有空格
				data:"",
				dataType:"JSONP"
			}
			$("#homeWrapper").html("<img src = '../images/load.gif'>  ");
			MyAjax.zeptoAjax(bannerData,function(data){
				$("#homeWrapper").html("");
				var result = eval(data) ;
				//console.log(result);
				
				var arr= [];//用来放置最后的轮播图；
				for(var item of result){
					//console.log(JSON.parse(item.goodsBenUrl)[0]);
					arr.push(JSON.parse(item.goodsBenUrl)[0]);
					
				}
				//console.log(arr);
				for(var i in arr){
				//	console.log(arr[i]);
					$("#homeWrapper").append('<div class="swiper-slide">'+
						'<img src = "'+arr[i]+'">'+
					'</div>')
				}
				
					var mySwiper = new Swiper("#homeBanner",{
					pagination:".swiper-pagination",
				    autoplay:3000,            
				    loop:true,
					autoplayDisableOnInteraction:false
					
					//http://datainfo.duapp.com/shopdata/datainfo.html
				})
				
			})
			
			
			//请求商品列表；
//			var listData = {
//				url :' http://datainfo.duapp.com/shopdata/getGoods.php?callback= ',
//				data = "",耻辱的等号；
//				dataType:"JSONP"
//				
//			}
			var listData = {
				url:"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
				data:"",
				dataType:"JSONP"
			}
			MyAjax.zeptoAjax(listData,function(data){
				
				var result  = eval(data);
				for(var item  of result){
					//console.log(item);
					$("#proList").append('<li class ="proItem " goodsID="'+item.goodsID+'" >'+
				'<div class="proImg">'+
					'<img src = "'+item.goodsListImg+'">'+
				'</div>'+
				'<div class="proInfo">'+
					'<p class="proTitle">'+
						item.goodsName+
					'</p>'+
					'<p class="proPrice">'+
						'￥'+item.price+
					'</p>'+
					'<p class="proDiscount">'+
						item.discount+'折'+
					'</p>'+
					'<button class= "addCart" goodsID = "'+item.goodsID+'" >'+
						'加入购物车'+
					'</button>'+					
				'</div>'+
			'</li>')
				}
				
				$(".addCart").on("tap",function(event){
//					if(localStorage.getItem("isLogin") == "1"){
//						//alert("可以加入购物车")
//						Cart.loadHeader();
//					    Cart.loadContent();
//						var goodsID = $(this).attr("goodsID");
//						var userID = localStorage.getItem("userID");
//						var obj = {
//							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
//							data:{
//								userID:userID,
//								goodsID:goodsID,
//								number:1
//							},
//							dataType:"JSON"
//						}
//						MyAjax.zeptoAjax(obj,function(data){
//							if(data == "1"){
//								alert("更新成功")
//							}else{
//								alert("gg")
//							}
//						})
//						
//					}else{
//						alert("请先登录")
//						login.loadHeader();
//					    login.loadContent("home");
//					    $("#footer").css("display","none");
//					}
					   
					   

					var goodsID = $(this).attr("goodsID");
					event.stopPropagation();
					AddCart.AddCart(goodsID,1,"home");
				})
				
				   //点击进入详情列表,将goodsID传到详情页面
				   $(".proItem").on("tap",function(){
				   	  var goodsID = $(this).attr("goodsID");
				   	  Detail.loadHeader("home");
				   	  Detail.loadContent(goodsID);
				   	  Detail.loadFooter();                                                                                                                                                                                                                                                                                      
				   })
			})
		})
	}
}
export default Home;