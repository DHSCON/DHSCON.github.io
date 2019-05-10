subj=getUrlParameter("subj")
console.log(subj)
if(subj==undefined){
	console.log("u dun fukked up")
}else{
	for(let i=0;i<clubs.email.length;i++){
		if(subj==clubs.email[i].title){
			$("#email").append(clubs.email[i].emailForm);
		}
	}
	console.log($("#email").text()=="\n")
	if ($("#email").text()=="\n"){
		$("#description").text("yo ho there ain't nothing here");
	}
}