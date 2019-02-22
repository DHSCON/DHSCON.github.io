$(document).ready(function(){
	function Search(query){
		let searchArr = text.split("function");
		console.log(searchArr);
		searchArr.shift();
		let positive = []
		for(let i=searchArr.length-1;i>0;i--){
			let words = query.split(" ")
			for(let j=0;j<words.length;j++){
				let regex = new RegExp(words[j],"i")
				//negative
				if(searchArr[i].search(regex)==-1){
				//positive	
				}else{
					function Title(str){
						let getTitle = str;
						getTitle=getTitle.substring(getTitle.search("Title")+9);
						getTitle = getTitle.substring(0,getTitle.search("\""));
						return getTitle;
					}
					function description(str){
						let getDes = str;
						getDes=getDes.substring(getDes.search("Description")+15);
						getDes = getDes.substring(0, getDes.search("\`"));
						//strip html tags
						function strip_html_tags(str){
						   if ((str===null) || (str===''))
							   return false;
						  else
						   str = str.toString();
						  return str.replace(/<[^>]*>/g, '');
						}
						getDes = strip_html_tags(getDes)
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
		}
		searchArr.shift();
		console.log(positive)
		
		$("#ClubName").text("Search Results:")
		$("#Description").text("")
		if(positive==0){
			$("#Description").append("No Results Found")
		}
		for(let i=0;i<positive.length;i++){
			$("#Description").append(`<div id=\"searchResult${i}\" class=\"result\"><\/div>`);
			$(`#searchResult${i}`).append(`
				<a onclick=\"${positive[i].function}\" href=\"#\">${positive[i].title}<\/a><br>
				<div class="searchDes">${positive[i].description}</div>
			`)
		}
	}

	$("#submit").click(function(){
		let search = $("#search").val();
		Search(search);
	});
});
