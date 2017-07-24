import "./../scss/loginOrRegister.scss";
import User from "./User";
import Home from "./Home";
import MainFooter from "./MainFooter";
import Toast from "./Toast";
import MyAjax from "./MyAjax";
import Cart from "./Cart";
export default {
	loadHeader(type){
		$("#header").load("views/login.html #loginHeader",() => {
			console.log("ok");
			/*
			 * 登录页面返回页面不一定，得需要看从哪里来
			 * 首页加入购物车时没有登录情况下，登录成功后返回首页
			 * 点击购物车时没有登录，登录成功后直接返回购物车，如过在此没有登录，直接返回，返回首页（或者个人中心）
			 * 个人中心点击登录，返回个人中心
			 * 		loadHeader()里添加一个参数 type
			 */
			$("#back").on("tap",function(){
				if(type == "home"){
					Home.loadHeader();
					Home.loadContent();
					MainFooter.loadFooterActive(0);
				}else if(type == "cart"){
					Home.loadHeader();
					Home.loadContent();
					MainFooter.loadFooterActive(0);
				}else if(type == "user"){
					User.loadHeader();
					User.loadContent();
					MainFooter.loadFooterActive(3);
				}
				$("#footer").css("display","block");
				
				
			})
		})
	},
	loadContent(type){
		$("#content").load("views/login.html #loginContent",() => {
			console.log("ok");
			$("#btn").on("tap",function(){
				//获取值
				var userID = $("#userID").val();
				var password = $("#password").val();
				
				if(userID == "" || password == ""){
					Toast.makeText("用户信息不完整",2000);
				}else{
					$("#btn").attr("disabled","disabled");//保证用户不可以连续点击
					$("#btn").val("正在登录...")
					var url ="http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
					MyAjax.fetch(url,function(data){
						$("#btn").removeAttr("disabled")//保证用户不可以连续点击
						$("#btn").val("登录")
						console.log(data);
						
						if(data == "0"){
							//用户名不存在
							Toast.makeText("用户不存在，请先注册",3000);
							$("#userID").val("");
							$("#password").val("");
							$("#userID").focus();
						}else if(data == "2"){
							//密码错误
							Toast.makeText("密码错误",3000);
							$("#password").val("");
							$("#password").focus();
						}else{
							console.log("!11111111111111")
							//登录成功
							/**
							 * 保存登录信息，并且返回上一页
							 */
							localStorage.setItem("isLogin","1");
							localStorage.setItem("userID",userID);
							
							if(type == "home"){
								Home.loadHeader();
								Home.loadContent();
								MainFooter.loadFooterActive(0);
								$("#footer").css("display","block");
							}else if(type == "cart"){
								Cart.loadHeader();
								Cart.loadContent();
								MainFooter.loadFooterActive(2);
								$("#footer").css("display","block");
							}else if(type == "user"){
								User.loadHeader();
								User.loadContent();
								MainFooter.loadFooterActive(3);
								$("#footer").css("display","block");
							}
							
							
						}
					},function(err){
						$("#btn").removeAttr("disabled")//保证用户不可以连续点击
						$("#btn").val("登录")
						console.log(err);
					});
				}
			})
		})
	}
}
