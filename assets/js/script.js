var sectEl = document.querySelector('main');
var timerEl = document.querySelector('#time');
var btn = document.createElement('button');
// timer variable.
var startTimer = 5;
var delayInterval = 1000;


btn.textContent = ("start");
btn.className = ("btnStart");
sectEl.appendChild(btn);

// function for  timer/score basic
function countdown() {
    var timeLeft = startTimer;

    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
            console.log(timerEl);
        }
        else {
            timerEl.textContent = "Time: " + 0;
            clearInterval(timeInterval);
            console.log(timerEl);
        }
    },delayInterval);
}

btn.onclick = countdown;
