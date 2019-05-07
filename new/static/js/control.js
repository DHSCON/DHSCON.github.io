let clubs
let page
let subj

// when the page loads:
$(document).ready(function(){
	
	// gets the JSON:
	$.get("	https://api.myjson.com/bins/xqszu", function(data, textStatus, jqXHR) {
		//sets clubs as the response
		clubs = data;
		//page as the url parameter
		page = getUrlParameter("page");
		//calls the start function for the club with the name that matches page
		start(clubs.pages[clubs.pages.findIndex(findClub)]);
		getIP()
	});
	
	//rickroll
	x = 0;
	$('#Description').click(function(){
		if(page=="dconHome"){
			x+=.1;
			$('.content').css({"transform":`rotate(${x}deg)`})
				if(x >= 2){
					window.open("https://www.youtube.com/watch?v=oHg5SJYRHA0")
					x = 0
					$('.content').css({"transform":`rotate(${x}deg)`})
				}
		}
	});
});

//function that strips html from a string
function strip_html_tags(str){
	if ((str===null) || (str==='')){
		return false;	
	}else{
		str = str.toString();
		return str.replace(/<[^>]*>/g, '');
	}
}

//function that returns if a string is in an object
function checkPage(obj, str){
		let found = false;
		if(obj.title.search(str)!=-1){found=true}
		if(obj.description.search(str)!=-1){found=true}
		for(let i=0; i<obj.tags.length;i++){
			if(obj.tags[i].search(str)!=-1){found=true}
		}
		return found;
}

//function that returns if a club name is equal to the page
function findClub(club){
	return club.name==page;
}

//start function:
function start(club){
	let search;
	//sets the title to the title of the club
	$("#ClubName").text(club.title);
	//empties the description
	$("#Description").text("");
	//fills the description with the description of the club
	$("#Description").append(club.description);
	//replaces title of tab with title of page
	$("title").text(club.title);
	if(page=="search"){
		//gets the search string
		search = getUrlParameter("query")
		//call the search function with the search string as a parameter
		Search(search);
	}
	else if(page=="sendEmail"){
		subj = getUrlParameter("subj");
		if(subj==undefined){
			subj="default"
		}
		fillEmail(clubs.email[clubs.email.findIndex(findEmail)]);
	}
	
}

function fillEmail(email){
	$("#email").prepend(email.emailForm);
	
}

function findEmail(email){
	return email.title==subj;
}

function sendEmail(){
	
	let emailDetails = getFormObj("email")
	emailDetails.timestamp = new Date().getTime();
	let template_id
	
	switch(subj){
		case "calendar":
			template_id = "template_XOmMYGhn";
			emailDetails.date = emailDetails.date.split('-').join('');
			emailDetails.time = emailDetails.time.split(':').join('')+'00';
			emailDetails.description = emailDetails.description.split(' ').join('+');
			emailDetails.title = emailDetails.title.split(' ').join('+');
			break
	}
	
	console.log(emailDetails)
	let service_id = "default_service";
	emailjs.send(service_id, template_id, emailDetails);
}

function getIP(){
	$.getJSON('https://ipapi.co/json/', function(data) {
		let found = false
		for(let i=0; i <clubs.users.length; i++){
			if(data.ip==clubs.users[i]){
				found = true
			}
		}
		if(!found){
			clubs.users.push(data.ip)
			
			updateJSON()  
		}
		return data.ip
	});
}

//function gets the URL parameter
function getUrlParameter(sParam) {
	let sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
}

//searches the the clubs for a string:
function Search(query){
	
	//splits query into an array on the spaces
	query = query.split(" ");
	
	//creates a regexp from each word to ignore case
	for(let i=0;i<query.length;i++){
		query[i]= new RegExp(query[i],"i")
	}
	
	let result=[]
	
	//go through the clubs 1 by 1:
	for(let i=0;i<clubs.pages.length; i++){
		let present=false;
		club = clubs.pages[i];
		//go through the words of the query 1 by 1:
		for(let j=0; j<query.length; j++){
			//if the club matches the word of the query:
			if(checkPage(club, query[j])){
				//tell if the result has been found before
				for(let k=0; k<result.length;k++){
					if(club==result[k]){
						present=true;
					}
				}
				//if it hasn't been yet, add it to the list
				if(!present){
					result.push(club);
				}
			}
		}
	}
	
	console.log(result);
	
	//changes the title and clears the description
	$("#ClubName").text("Search Results:")
	$("#Description").text("")
	
	//if there are no search results, says "No Results Found"
	if(result==0){
		$("#Description").text("No Results Found")
	}
	
	//puts a div in for each search result
	for(let i=0;i<result.length;i++){
		$("#Description").append(`<div id=\"searchResult${i}\" class=\"result\"></div>`);
		$(`#searchResult${i}`).append(`<a href=\"\./?page=${result[i].name}\">${result[i].title}</a>`);
		$(`#searchResult${i}`).append(`<div class=\"searchDes\">${strip_html_tags(result[i].description)}</div>`);
		

	}
}

function getFormObj(formId) {
    var formObj = {};
    var inputs = $('#'+formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
}
