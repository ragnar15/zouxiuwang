export default {
	makeText(str ,time){
		 $("#toast").show().html(str);
		setTimeout(function(){
		 $("#toast").hide()
		},time)
	}
}
