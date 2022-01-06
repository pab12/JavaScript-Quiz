var sectEl = document.querySelector('main');
var timerEl = document.querySelector('#time');
var btn = document.createElement('button');
var time = questions.length * 15;
var delayInterval = 1000;
var currentQuestionIndex = 0;
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var questionsEl = document.getElementById("questions");
var endOfQuizEl = document.getElementById("end-page")
var finalscoreEl = document.getElementById("final-message");
var initialsInput = document.querySelector('#initials');
var submitButton = document.querySelector('#submit');
var msgDiv = document.querySelector('#msg');
var allScores = document.getElementById("high-scores");
var viewScores = document.getElementById("highScore");
var highScores = 0;
btn.setAttribute('id', 'hi');
btn.setAttribute('type', 'button');

btn.textContent = ("start");
btn.className = ("btnStart");
sectEl.appendChild(btn);


// function for  timer/score basic
function countdown() {
    questionsEl.removeAttribute("class","hide")
    btn.setAttribute("class", "hide");
    

    var timeInterval = setInterval(function () {
        if (time >= 1) {
            timerEl.textContent = "Time: " + time;
            time--;
         
            console.log(timerEl);
        }
        else {
            timerEl.textContent = time;
            time = "";
            clearInterval(timeInterval);
            
            console.log(timerEl);
        }
    }, delayInterval);
    getQuestions();
  
};

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
    if (this.value !== questions[currentQuestionIndex].answer) {
        feedbackEl.setAttribute("class", "hide");
        time -= 15;
        if(time < 0){
            time = 0;
        }
        timerEl.textContent = "Time: " + time;
        feedbackEl.textContent = "wrong";
        
        feedbackEl.removeAttribute("class","hide");

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

// initial  button function
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    var playerInitials = document.querySelector('#initials').value;

    if( playerInitials === '') {
        displayMessage('error', 'initials cannot be blank');
    } else {
        displayMessage('success', ' score saved');

        localStorage.setItem('initials', playerInitials);
       
        // var score = localStorage.setItem('highscore');
        renderHighScore();
    }
});

    // saving highscore
    function highScore(){
        highScores = time;
            localStorage.setItem('highscore',highScores );
            // JSON.parse(window.localStorage.getItem(highScores));
            
    }

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
  };

  function renderHighScore() {
      var initial = localStorage.getItem('initials');
      var score = localStorage.getItem('highscore');
      allScores.textContent = initial + score;
      localStorage.setItem('allScores', allScores);
  };

function quizEnd() {
    
    finalscoreEl.textContent ="your score is: " + time;
    timerEl.setAttribute("class", "hide")
    questionsEl.setAttribute("class", "hide")
    endOfQuizEl.removeAttribute("class", "hide");
    feedbackEl.removeAttribute("class","hide");
    submitButton.removeAttribute("class","hide");
    // localStorage.setItem('highscore',finalscoreEl);
    highScore();
    renderHighScore();


    
};
viewScores.onclick = renderHighScore;

btn.onclick = countdown;
