import MyAjax from "./MyAjax";
import Toast from "./Toast";
import Login from "./Login";
export default {
	addCart(goodsID,number,type){
		if(localStorage.getItem("isLogin") == "1"){
			var userID = localStorage.getItem("userID");
			var url = "http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+number;
			MyAjax.fetch(url,function(data){
				console.log(data)
				
				if(data == "1"){
					Toast.makeText("加入购物车成功",1000);
				}else{
					Toast.makeText("加入购物车失败",1000);
				}
			},function(err){
				console.log(err)
			})
		}else{
			Login.loadHeader(type);
			Login.loadContent(type);
			$("#footer").css("display","none")
			
		}
	},
	deleteCart(goodsID,successCallback,failCallback){
		//如果删除，肯定登录成功
		var userID = localStorage.getItem("userID");
		var url = "http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number=0";
			MyAjax.fetch(url,function(data){
				console.log(data)
				
				if(data == "1"){
					Toast.makeText("删除成功",1000);
					successCallback();
				}else{
					Toast.makeText("删除失败",1000);
					failCallback();
				}
			},function(err){
				console.log(err)
			})
	}
}
