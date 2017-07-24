import "./../scss/loginOrRegister.scss";
import User from "./User";
import MainFooter from "./MainFooter";
export default {
	loadHeader(){
		$("#header").load("views/register.html #registerHeader",() => {
			console.log("ok");
			
			//返回user.html,让底部出现
			$("#back").on("tap",function(){
				User.loadHeader();
				User.loadContent();
				MainFooter.loadFooterActive(3);
				$("#footer").css("display","block");
			})
		})
	},
	loadContent(){
		$("#content").load("views/register.html #registerContent",() => {
			console.log("ok")
		})
	}
}
