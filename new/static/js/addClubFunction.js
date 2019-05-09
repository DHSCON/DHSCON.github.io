function Club(name, title, description, tagsArray){
	this.name = name;
	this.title = title
	this.description = description;
	this.tags = tagsArray;
}

function Email(title, emailForm){
	this.title = title;
	this.emailForm = emailForm;
}

function addClub(name, title, description, tagsArray){
	clubs.pages.push(new Club(name, title, description, tagsArray));
	updateJSON()
}

function addEmail(title, emailForm){
	clubs.email.push(new Email(title, emailForm));
	updateJSON()
}

function updateJSON(){
	update = JSON.stringify(clubs)

	$.ajax({
		url:"https://api.myjson.com/bins/xqszu",
		type:"PUT",
		data: update,
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(data, textStatus, jqXHR){

		}
	});  
}