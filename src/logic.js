const xhttp = new XMLHttpRequest();

//========INIT=====================================================
window.onload = main();

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
    })   
    div.appendChild(startButton);
    
    home.appendChild(div);
}


//========API==================================================

//URL

//REQUEST

//GET

