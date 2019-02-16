$(document).ready(function(){
	function Search(query){
		searchArr = text.split("function");
		searchArr.shift();
		let positive = []
		for(let i=searchArr.length-1;i>0;i--){
			regex = new RegExp(query,"i")
			//negative
			if(searchArr[i].search(regex)==-1){
				searchArr.splice(i,1);
			//positive	
			}else{
				console.log(searchArr[i]);
				function Title(str){
					let getTitle = str;
					getTitle=getTitle.substring(getTitle.search("Title")+9);
					getTitle = getTitle.substring(0,getTitle.search("\""));
					return getTitle;
				}
				function description(str){
					let getDes = str;
					getDes=getDes.substring(getDes.search("Description")+15);
					getDes = getDes.substring(0, getDes.search("\""));
					return getDes;
				}
				function getFunc(str){
					let clubFunction = str;
					clubFunction=clubFunction.trim();
					clubFunction = clubFunction.substring(0, clubFunction.search(/\s/));
					return clubFunction;
				}

				positive.push({
					"title": Title(searchArr[i]),
					"description": description(searchArr[i]),
					"function": getFunc(searchArr[i])
				})
			}
		}
		searchArr.shift();
		console.log(positive)
		$("#ClubName").text("Search Results:")
		for(let i=0;i<positive.length;i++){
			$(".content").append(`<div id=\"searchResult${i}\"><\/div>`);
			$(`#searchResult${i}`).append(`<a onclick=\"${positive[i].function}\" href=\"#\">${positive[i].title}<\/a>`)
		}
	}

	$("#submit").click(function(){
		let search = $("#search").val();
		Search(search);
	});
});
