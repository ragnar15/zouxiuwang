import Home from "./Home";
import Cart from "./Cart";
import MainFooter from "./MainFooter";
import MyAjax from "./MyAjax";
export default {
	loadHeader(type){
		$("#header").load("views/detail.html #detailHeader",() => {
			console.log("ok")
			$("#back").on("tap",function(){
				if(type == "home"){
					Home.loadHeader();
					Home.loadContent();
					MainFooter.loadFooter()
					MainFooter.loadFooterActive(0);
				}else if(type == "cart"){
					Cart.loadHeader();
					Cart.loadContent();
					MainFooter.loadFooter();
					MainFooter.loadFooterActive(2);
				}
				$("#footer").css("display","block");
				
				
			})
		})
	},
	loadContent(goodsID){
		$("#content").load("views/detail.html #detailContent",() => {
			console.log("ok");
			/**‘
			 * 依据goodsID可以请求出需要的数据
			 */
			var url = "http://datainfo.duapp.com/shopdata/getGoods.php?goodsID="+goodsID;
			MyAjax.fetchJsonp(url,function(data){
				console.log(data)
				$("#proImg").attr("src",data[0].goodsListImg)
				$("#goodsName").html(data[0].goodsName)
			},function(err){
				console.log(err)
			})
		})
	},
	loadFooter(){
		$("#footer").load("views/detail.html #detailFooter",() => {
			console.log("ok")
			
		})
	}
}
