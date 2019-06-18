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
    
    let header = document.createElement("h1");
    header.innerHTML = "Press Button to Begin"

    //startbutton
    let startButton = document.createElement("button");
    startButton.setAttribute("id", "startButton");
    startButton.innerHTML = "Start";
    startButton.addEventListener("click", () => {
        ajaxRequest(formatUrl(amountOfQuestions));
    })
    div.appendChild(header);
    div.appendChild(startButton);
    home.appendChild(div);
}

//question-view
function quizView(quiz){
    
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
    
    //Buttons for alternatives
    let answerButton, text, i;
	for (i=0; i<currentQuestion.alternatives.length; i++){
        text = currentQuestion.alternatives[i];
		answerButton = document.createElement("button");
		answerButton.setAttribute("class", "answerButton");
		answerButton.setAttribute("value", text);
		answerButton.innerHTML = text;
		alternatives.appendChild(answerButton);
	}
    home.appendChild(alternatives);

    let answerButtons = document.getElementsByClassName("answerButton");

    //Validation
	for (let i=0; i<answerButtons.length; i++){
		let validate = "";
		answerButtons[i].addEventListener("click", function(){
            if(this.value === currentQuestion.correct_answer){
                validate = "Correct!";
                score++;
            }else{
                validate = "Incorrect!";
            }

            home.innerHTML = "";

            let validation = document.createElement("p");
            validation.innerHTML = validate;

            let nextButton = document.createElement("button");
            nextButton.setAttribute("id", "nextButton");
            nextButton.innerHTML = "Next";
            nextButton.addEventListener("click", () => {
                loadQuestion(quiz);
            })
            home.appendChild(validation);
            home.appendChild(nextButton);   
		});
	}
}
    
    //results-view
    function resultsView(){

        let homeButton = document.createElement("button");
        homeButton.setAttribute("id", "homeButton");
        homeButton.innerHTML = "Home";
        homeButton.addEventListener("click", () => {
            main();
        })

        let home = document.querySelector("#home");
        home.innerHTML = ""
        let header = document.createElement("h1");
        header.innerHTML = "Your Result:";
        let result = document.createElement("p");
        result.innerHTML = score + " out of " + amountOfQuestions;
        home.appendChild(header);
        home.appendChild(result);
        home.appendChild(homeButton);
    }
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
        quizView(quiz)
	}
	else{
        resultsView();
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

