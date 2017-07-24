import "./../scss/home.scss";
import "./../scss/proList.scss";

import AddCart from "./AddCart";
import Detail from "./Detail";
import MyAjax from "./MyAjax.js";
export default {
	loadHeader(){
		$("#header").load("views/home.html #homeHeader",() => {
			console.log("ok")
		})
	},
	loadContent(){
		var that = this;
		$("#content").load("views/home.html #homeContent",() => {
//			console.log("ok")
			that.loadHomeBanner();
			that.loadList();
		})
	},
	loadHomeBanner(){
		//静态轮播实例化
//			var mySwiper = new Swiper("#homeBanner",{
//				autoplay:3000,
//				loop:true,
//				autoplayDisableOnInteraction:false,
//				pagination:".swiper-pagination"
//			});
			$("#homeWrapper").html("<img src='../image/loading.gif' style='width:30px;height:30px'/>");
			
			var url = "http://datainfo.duapp.com/shopdata/getBanner.php";
				MyAjax.fetchJsonp(url,function(data){
					console.log(data)
					$("#homeWrapper").html("");
					for(var item of data){
						$("#homeWrapper").append('<div class="swiper-slide">'+
							'<img src="'+JSON.parse(item.goodsBenUrl)[0]+'"/>'+
						'</div>')
					}
					var mySwiper = new Swiper("#homeBanner",{
						autoplay:3000,
						loop:true,
						autoplayDisableOnInteraction:false,
						pagination:".swiper-pagination"
					});
				},function(err){
					console.log(err)
				})
//			var bannerObj = {
//				url:"http://datainfo.duapp.com/shopdata/getBanner.php?callback=",
//				data:{},
//				dataType:"JSONP"
//			}
//			
//			MyAjax.zeptoAjax(bannerObj,function(data){
//				//清空加载
//				$("#homeWrapper").html("");
//				//请求到的数据
////				console.log(eval(data));
//				var obj = eval(data);
//				console.log(JSON.parse(obj[0].goodsBenUrl)[0]);
//				
//				for(var item of obj){
//					$("#homeWrapper").append('<div class="swiper-slide">'+
//						'<img src="'+JSON.parse(item.goodsBenUrl)[0]+'"/>'+
//					'</div>')
//				}
//				//加载数据成功之后实例化数据
//				var mySwiper = new Swiper("#homeBanner",{
//					autoplay:3000,
//					loop:true,
//					autoplayDisableOnInteraction:false,
//					pagination:".swiper-pagination"
//				});
//			})
	},
	loadList(){
		$("#proList").html("<img src='../image/loading.gif' style='width:30px;height:30px'/>");
		var url ="http://datainfo.duapp.com/shopdata/getGoods.php";
		MyAjax.fetchJsonp(url,function(data){
			console.log(data)
			$("#proList").html("");
			
			for(var item of data){
				$("#proList").append('<li class="proItem" goodsID="'+item.goodsID+'">'+
						'<div class="proImg">'+
							'<img src="'+item.goodsListImg+'"/>'+
						'</div>'+
						'<div class="proInfo">'+
							'<p class="proTitle">'+
								item.goodsName+
							'</p>'+
							'<p class="proPrice">'+
								'￥ '+item.price+
							'</p>'+
							'<p class="proDiscount">'+
								item.discount+'折'+
							'</p>'+
							'<button class="addCart" goodsID="'+item.goodsID+'">加入购物车</button>'+
						'</div>'+
					'</li>')
			}
			
			/*
			 * 获取自定义属性的值，然后加入购物车方法---- AddCart模块
			 */
			$(".addCart").on("tap",function(ev){
				var goodsID = $(this).attr("goodsID");
				ev.stopPropagation();
				AddCart.addCart(goodsID,1,"home");
			})
			
			/**
			 * 点击列表进入产品的详情页面
			 * 将goodsID告诉详情页面
			 */
			$(".proItem").on("tap",function(){
				var goodsID = $(this).attr("goodsID");
				
				Detail.loadHeader("home");
				Detail.loadContent(goodsID);
				Detail.loadFooter();
			})
		},function(err){
			console.log(err)
		})
	}
}
