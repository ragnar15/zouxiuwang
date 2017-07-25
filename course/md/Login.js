import MyAjax from  "./MyAjax.js";
import Home from "./Home.js";
import Mainfooter from "./Mainfooter.js";
import Cart from "./Cart.js";
import User from "./User.js";
import Toast from "./Toast.js";
var login = {
	loadHeader(type){
		$("#header").load("views/login.html #loginHeader",function(){
			//登录页面不一定返回user页面；这里不唯一！！！！
			//首页加入购物车在没有登录情况下,登陆成功后返回首页
			//点击购物车时候在没有登录情况下,登陆成功后返回购物车；如果不登陆了返回首页或者个人中心；
			//解决办法：：：：loadHeader（）里边添加参数   type 
			$("#back").on("tap",function(){
				
				if(type == "home"){
					Home.loadHeader();
				    Home.loadContent();
				    Mainfooter.loadFooterStyle(0);
				}else if(type == "cart"){
					Home.loadHeader();
				    Home.loadContent();
				     Mainfooter.loadFooterStyle(0);
				}else if(type == "user"){
					User.loadHeader();
				    User.loadContent();
				     Mainfooter.loadFooterStyle(3);
				}
				$("#footer").css("display","block");
			})
		})
	},
	loadContent(type){
		$("#content").load("views/login.html #loginContent",function(){
			$("#btn").on("tap",function(){
				//正则验证是否符合要求；
				var userID = $("#userID").val();
				var password = $("#password").val();
				if(userID == "" || password == ""){
					Toast.makeText("信息不完整",2000);
					//alert ("信息不完整");
				}else{

					//提交服务器
//					var userobj = {
//						url :"http://datainfo.duapp.com/shopdata/userinfo.php",
//						data:{
//							status:"login",
//							userID: userID,
//							password: password
//						},		
//						dataType:"JSON"
//					}
//					MyAjax.zeptoAjax(userobj,function(data){
//						console.log(data);
//						if(data == "0"){
//							alert("用户不存在")
//						}else if(data == "2"){
//							alert("密码错误")
//						}else{
//                              localStorage.setItem("isLogin","1");
//                              localStorage.setItem("userID",userID);
//                              
//                              if(type == "home"){
//                              	Home.loadHeader();
//									Home.loadContent();
//									Mainfooter.loadfooterStyle(0);
//                              }else if(type  == "cart"){
//                              	Cart.loadHeader();
//									Cart.loadContent();
//									//Mainfooter.loadfooter(2);
//									Mainfooter.loadfooterStyle(2);
//                              }						
//						}
//					})


 					//下边用fecth代替ajax;
 					
 					  $("#btn").attr("disabled","disabled");//不让用户连续点击；
 					  $("#btn").val("正在登陆...")
 					  var  url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
 					MyAjax.fetch(url,function(data){
 						$("#btn").removeAttr("disabled");
 						  $("#btn").val("登陆");
 						console.log(data);
 						if(data == "0"){
 							Toast.makeText("用户不存在,请先注册",2000);
 							$("#userID").val("");
 							$("#password").val("");
 							$("#userID").focus();
 						}else if(data == "2"){
 							Toast.makeText("密码错误",2000);
 							$("#password").val("");
 							$("#password").focus();
 							
 						}else{
 							Toast.makeText("登陆成功",2000);
 							//保存登录信息；你并且反回上一页；
 							localStorage.setItem("isLogin","1");
                            localStorage.setItem("userID",userID);
 							if(type == "home"){
 								console.log("home")
 								Home.loadHeader();
							    Home.loadContent();
							    Mainfooter.loadFooterStyle(0);
								$("#footer").css("display","block");
								
 							}else if(type == "cart"){
 								Cart.loadHeader();
								Cart.loadContent();
								 Mainfooter.loadFooterStyle(2);
								$("#footer").css("display","block");
 							}else if(type == "user"){
 								User.loadHeader();
								User.loadContent();
								 Mainfooter.loadFooterStyle(3);
								$("#footer").css("display","block");
 							}
 						}
 					},function(err){
 					    $("#btn").removeAttr("disabled");
 					      $("#btn").val("登陆")
 						console.log(err);
 					})
 					
 					
				}
			       
			})
		})
	}
}
export default login;