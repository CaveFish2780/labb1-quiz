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
        ajaxRequest(formatUrl(amountOfQuestions));
    })
    
    div.appendChild(startButton);
    home.appendChild(div);
}

//question-view
function quizView(quiz){
    console.log("quizview");
    
    let home = document.querySelector("#home");;
    home.innerHTML = "";
    
    let div = document.createElement("div");
    div.setAttribute("id", "quiz");

    let currentQuestion = quiz.question();
    let answers = [...currentQuestion.incorrect_answers];
    answers.push(currentQuestion.correct_answer);
    answers.sort(() => Math.random() - 0.5);
    currentQuestion.alternatives = answers;
    
    let questionTitle = document.createElement("p");
    questionTitle.setAttribute("id", "questionTitle");
    questionTitle.innerHTML = "Question " + quiz.count + " of " +quiz.length;
    div.appendChild(questionTitle);

    let questionText = document.createElement("p");
    questionText.innerHTML = currentQuestion.question;
    div.appendChild(questionText);
    home.appendChild(div);
    let alternatives = document.createElement("div");
    alternatives.setAttribute("id", "alternatives");
    
    let answerButton, text, i;

    console.log(currentQuestion.alternatives);
	for (i=0; i<currentQuestion.alternatives.length; i++){
        text = currentQuestion.alternatives[i];
        console.log("text");
		answerButton = document.createElement("button");
		answerButton.setAttribute("class", "answerButton");
		answerButton.setAttribute("value", text);
		answerButton.innerHTML = text;
		alternatives.appendChild(answerButton);
	}
    home.appendChild(alternatives);
    }
    
    //results-view
    
//========SETUP-FUNCTIONS======================================

function setup(quiz){
    
    quiz.count = 0;

	quiz.question = function(){
		let question = quiz[this.count];
		this.count++;
		return question;
    };
    loadQuestion(quiz);
}

function loadQuestion(quiz){
	if (quiz.count < quiz.length){
        console.log("load");
        quizView(quiz)
	}
	else{
		console.log("game over")
	}
}

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
            console.log("ajax");
            setup(quiz);
		}
		if (xhttp.status === 404){
            alert("404 NOT FOUND");
        }
        if (xhttp.status === 500){
            alert("500 INTERNAL SERVER ERROR");
        }
	}
};

