import Register from "./Register";
import Login from "./Login";
export default {
	loadHeader(){
		$("#header").load("views/user.html #userHeader",() => {
			console.log("ok")
		})
	},
	loadContent(){
		$("#content").load("views/user.html #userContent",() => {
			console.log("ok")
			/**
			 * 此处判断用户有没有登录，如果登录显示用户信息，如果没有登录显示登录注册按钮
			 *   isLogin 1   ---- 登录
			 *   userID      -----  用户名
			 */
			if(localStorage.getItem("isLogin") == "1"){
				//已经登录
				$(".successlogin").show();
				$(".noLogin").hide();
				$("#username").html(localStorage.getItem("userID"));
			}else{
				$(".noLogin").show();
				$(".successlogin").hide();
				//給注册和登录添加点击事件
				$("#registerBtn").on("tap",function(){
					Register.loadHeader();
					Register.loadContent();
					
					$("#footer").css("display","none");
				})
				$("#loginBtn").on("tap",function(){
					Login.loadHeader("user");//登录页面返回的标识
					Login.loadContent("user");//用于登录成功之后返回页面
					$("#footer").css("display","none");
				})
			}
		})
	}
}
