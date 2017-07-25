import Home from "./Home.js";
import Mainfooter from "./Mainfooter.js";
var Search = {
	loadHeader(){
		$("#header").load("views/search.html #searchHeader",function(){
			$("#back").on("tap",function(){			
				$("#footer").css({"height":"50px"});
				Home.loadHeader();
				Home.loadContent();
				Mainfooter.loadfooter();
			})
		})
	},
	loadContent(){
		$("#content").load("views/search.html #searchContent",function(){
			
		})
	},
	loadFooter(){
		$("#footer").load("views/search.html #searchFooter",function(){
			
		})
	}
}
export default Search;