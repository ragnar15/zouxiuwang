import "./../scss/kind.scss";
export default {
	loadHeader(){
		$("#header").load("views/kind.html #kindHeader",() => {
			console.log("ok")
		})
	},
	loadContent(){
		$("#content").load("views/kind.html #kindContent",() => {
			console.log("ok")
		})
	}
}
