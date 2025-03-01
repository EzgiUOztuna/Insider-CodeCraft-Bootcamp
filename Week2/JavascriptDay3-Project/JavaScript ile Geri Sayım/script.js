let countdown;
let timeLeft = 10;
const timerDisplay = document.getElementById('display');

function updateDisplay() {
    display.textContent = timeLeft > 0 ? timeLeft : "Time is up!";
}

function increaseElement() {
    clearInterval(countdown);

    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(countdown);
            updateDisplay();
        }
    }, 1000);
}

function resetElement() {
    clearInterval(countdown);
    timeLeft = 10;
    display.textContent = timeLeft;
}