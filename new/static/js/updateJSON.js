clubs.pages[(GET INDEX OF CLUB)].description = `

`//put description between tildes 

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