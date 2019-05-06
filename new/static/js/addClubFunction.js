function Club(name, title, description, tagsArray){
	this.name = name;
	this.title = title
	this.description = description;
	this.tags = tagsArray;
	clubs.pages.push(this);
	updateJSON()
}

function addEmail(title, emailForm){
	this.title = title;
	this.emailForm = emailForm
	clubs.email.push(this);
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