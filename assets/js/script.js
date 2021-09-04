var sectEl = document.querySelector('main');
var timerEl = document.querySelector('#time');
var btn = document.createElement('button');
var time = questions.length * 15;
var delayInterval = 1000;
var currentQuestionIndex = 0;
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var questionsEl = document.getElementById("questions");
var finalscoreEl = document.getElementById("end-page");
btn.setAttribute('id', 'hi');
btn.setAttribute('type', 'button');

btn.textContent = ("start");
btn.className = ("btnStart");
sectEl.appendChild(btn);


// function for  timer/score basic
function countdown() {
    questionsEl.removeAttribute("class")
    

    var timeInterval = setInterval(function () {
        if (time >= 1) {
            timerEl.textContent = "Time: " + time;
            time--;
            console.log(timerEl);
        }
        else {
            timerEl.textContent = "Time: " + 0;
            clearInterval(timeInterval);
            console.log(timerEl);
        }
    }, delayInterval);
    getQuestions();
}

// after timer started get questions
function getQuestions() {
    // save questions array in a variable
    var currentQuestion = questions[currentQuestionIndex]
    // pushing questions into the html 
    var titlePage = document.querySelector("#question-title");
    titlePage.textContent = currentQuestion.title;
    // clear all questions choices
    choicesEl.innerHTML = "";
    // loop over the choices
    currentQuestion.choices.forEach(function (choice, i) {
        console.log(choice);
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = `${i + 1}. ${choice}`
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    // Check if user guess wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;
        if(time < 0){
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong";

    }
    else {
        feedbackEl.textContent = "correct";
    }
    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
        quizEnd();
    }
    else {
        getQuestions();
    }
    // if its wrong penalize time
    // display new time
    // feedback to let them know if its wrong

}

function quizEnd() {
    finalscoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide")
}
btn.onclick = countdown;
