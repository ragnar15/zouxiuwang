import MyAjax from  "./MyAjax.js";

import Home from "./Home.js";
import User from "./User.js";
import Mainfooter from "./Mainfooter.js";
var Register = {
	loadHeader(){
		$("#header").load("views/register.html #registerHeader",function(){
			//返回user.html
			$("#back").on("tap",function(){
				User.loadHeader();
				User.loadContent();
				 Mainfooter.loadFooterStyle(3);
				$("#footer").css("display","block");
			})
		})
	},
	loadContent(){
		$("#content").load("views/register.html #registerContent",function(){
			$("#btn").on("tap",function(){
				//正则验证是否符合要求；
				var userId = $("#userID").val();
				var password = $("#password").val();
				if(userId == "" || password == ""){
					alert ("信息不完整");
				}else{
					//提交服务器
					var userobj = {
						url :"http://datainfo.duapp.com/shopdata/userinfo.php",
						data:{
							status:"register",
							userID: userId,
							password: password
						},
						
						
						dataType:"JSON"
					}
					MyAjax.zeptoAjax(userobj,function(data){
						console.log(data);
						if(data == "0"){
							alert("用户名重名")
						}else if(data == "1"){
							alert("注册成功")
						}else{
							alert("注册失败")
						}
					})
				}
			})
		})
	}
}
export default Register;