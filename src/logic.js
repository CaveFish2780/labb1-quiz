//========GLOBAL=VARS=========================================
const xhttp = new XMLHttpRequest();
let score = 0;
let amountOfQuestions = 10;
//========MAIN================================================
window.onload = main();

//========VIEWS==============================================
//main-view
function main(){
    home.innerHTML = "";
    //start div
    let div = document.createElement("div");
    div.setAttribute("id", "start");
    div.innerHTML = "";
    //startbutton
    let startButton = document.createElement("button");
    startButton.setAttribute("id", "startButton");
    startButton.innerHTML = "Start";
    startButton.addEventListener("click", () => {
        console.log("log");
        ajaxRequest(formatUrl(10));
    })
    div.appendChild(startButton);
    
    home.appendChild(div);
}

//question-view

//results-view


//========API==================================================

//URL-for-requests 
//adds prefered amount of questions to url
function formatUrl(amount){
    return "https://opentdb.com/api.php?amount=" + amount;
}
//REQUEST
function ajaxRequest(url){
    xhttp.open("get", url, true);
    xhttp.send();
}
//GET JSON OBJECT
xhttp.onreadystatechange = function() {
    console.log(xhttp.readyState);
	if (xhttp.readyState === 4){
        if (xhttp.status === 200){
            console.log("200");
			let quiz = JSON.parse(this.responseText).results;
            console.log(quiz);
		}
		if (xhttp.status === 404){
            alert("404 NOT FOUND");
        }
        if (xhttp.status === 500){
            alert("500 INTERNAL SERVER ERROR");
        }
	}
};

