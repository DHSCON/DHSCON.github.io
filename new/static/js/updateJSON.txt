clubs.pages[(GET INDEX OF CLUB)].description = `

`//put description between tildes 

clubs = JSON.stringify(clubs)

$.ajax({
    url:"https://api.myjson.com/bins/xqszu",
    type:"PUT",
    data: clubs,
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, textStatus, jqXHR){

    }
});  