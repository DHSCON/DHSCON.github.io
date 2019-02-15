$(document).ready(function(){
	function Search(query){
		searchArr = text.split("function");
		searchArr.shift();
		let positive = []
		for(let i=searchArr.length-1;i>0;i--){
			if(searchArr[i].search(query)==-1){
				searchArr.splice(i,1);
				
			}else{
				searchArr[i]=searchArr[i].substring(searchArr[i].search("Title")+9)
			}
		}
		searchArr.shift();
		console.log(searchArr)
	}

	$("#submit").click(function(){
		let search = $("#search").val();
		Search(search);
	});
});
