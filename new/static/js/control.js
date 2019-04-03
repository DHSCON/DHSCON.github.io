let clubs
let page

$(document).ready(function(){
	
	$.get("	https://api.myjson.com/bins/xqszu", function(data, textStatus, jqXHR) {
		clubs = data;
		page = getUrlParameter("page");
		start(clubs.pages[clubs.pages.findIndex(findClub)]);
	});
	
	
	
	function Search(query){
		
		query = query.split(" ");
		
		for(let i=0;i<query.length;i++){
			query[i]= new RegExp(query[i],"i")
		}
		
		let result=[]
		
		for(let i=0;i<clubs.pages.length; i++){
			let present=false;
			club = clubs.pages[i];
			for(let j=0; j<query.length; j++){
				
				if(checkPage(club, query[j])){
					for(let k=0; k<result.length;k++){
						if(club==result[k]){
							present=true;
						}
					}
					if(!present){
						result.push(club);
					}
				}
			}
		}
		
		console.log(result);
		
		$("#ClubName").text("Search Results:")
		$("#Description").text("")
		
		if(result==0){
			$("#Description").text("No Results Found")
		}
		
		for(let i=0;i<result.length;i++){
			$("#Description").append(`<div id=\"searchResult${i}\" class=\"result\"></div>`);
			$(`#searchResult${i}`).append(`<a href=\"\./?page=${result[i].name}\">${result[i].title}</a>`);
			$(`#searchResult${i}`).append(`<div class=\"searchDes\">${strip_html_tags(result[i].description)}</div>`);
			

		}
		
	}

	$("#submit").click(function(){
		let search = $("#search").val();
		Search(search);
	});
	
	function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};

	
	
});

function strip_html_tags(str){
	if ((str===null) || (str==='')){
		return false;	
	}else{
		str = str.toString();
		return str.replace(/<[^>]*>/g, '');
	}
}

function checkPage(obj, str){
	return(obj.title.search(str)!=-1 || obj.description.search(str)!=-1 || obj.tags.includes(str));
}

function findClub(club){
	return club.name==page;
}

function start(club){
	$("#ClubName").text(club.title)
	$("#Description").text("")
	$("#Description").append(club.description)
	
}