
export default {
	loadHeader(){
		$("#header").load("views/more.html #moreHeader",() => {
			console.log("ok")
		})
	},
	loadContent(){
		$("#content").load("views/more.html #moreContent",() => {
			console.log("ok")
			/**
			 * 判断有没有登录，如果登录 显示退出登录
			 * 
			 * 如果没有，则什么也不显示
			 */
			if(localStorage.getItem("isLogin") == "1"){
				$("#cancel").on("tap",function(){
					localStorage.setItem("isLogin","0");
					$("#cancel").hide();
				})
			}else{
				$("#cancel").hide();
			}
			
			
		})
	}
}
