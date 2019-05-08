function Club(name, title, description, tagsArray){
	this.name = name;
	this.title = title
	this.description = description;
	this.tags = tagsArray;
}

function Email(title, name, emailForm){
	this.title = title;
	this.name = name;
	this.emailForm = emailForm;
}

function addClub(name, title, description, tagsArray){
	clubs.pages.push(new Club(name, title, description, tagsArray));
	updateJSON()
}

function addEmail(title, name, emailForm){
	clubs.email.push(new Email(title, name, emailForm));
	updateJSON()
}

function Teacher(lastName, Email, clubsArr){
	this.lastName = lastName;
	this.email = Email;
	this.clubsArr = clubsArr;
}

function addTeacher(lastName, Email, clubsArr){
	clubs.teachers.push(new Teacher(lastName, Email, clubsArr));
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