import "./../scss/loginorregister.scss";
import Register from "./Register.js";

import  login from "./Login.js";
var User = {
	loadHeader(){
		$("#header").load("views/user.html #userHeader",function(){
			
		})
	},
	loadContent(){
		$("#content").load("views/user.html #userContent",function(){
			
			
			
			
			if(localStorage.getItem("isLogin") == "1"){
				//已经登录；
				$("#successlogin").show();
				$("#nologin").hide();
				$("#username").html(localStorage.getItem("userID"));
			}else{
				$("#successlogin").hide();
				$("#nologin").show();
			}
			
			
			$("#registerBtn").on("tap",function(){
				Register.loadHeader();
				Register.loadContent();
				$("#footer").css("display","none");
			})
			$("#loginBtn").on("tap",function(){
				login.loadHeader("user");//登录页面返回的标识
				login.loadContent("user");//用于登陆成功后返回原来的页面
				$("#footer").css("display","none");
			})
		})
	}
}
export default User;