const xhttp = new XMLHttpRequest();

var div = document.createElement("div");
div.setAttribute("class", "selects");
var base = document.querySelector(#base)
window.onload = div;
xhttp.onreadystatechange = function() {
	console.log(xhttp.readyState);
	if (xhttp.readyState === 4){
		if (xhttp.status === 200){
			console.log("200");
			var questions = JSON.parse(this.responseText).results;
			
		}
		if (xhttp.status === 404){
			console.log("404");
		}
	}
};