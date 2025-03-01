let countdown;
let remainingTime = 0;

function updateDisplay(time) {
    document.getElementById("countdownDisplay").textContent = time + " saniye kaldı.";
}

document.getElementById("start").addEventListener("click", function () {
    clearInterval(countdown);
    remainingTime = document.getElementById("timeInput").value;

    if (isNaN(remainingTime) || remainingTime <= 0) {
        alert("Please enter a valid positive integer for the countdown.");
        return;
    }
    updateDisplay(remainingTime);

    countdown = setInterval(function () {
        remainingTime--;
        updateDisplay(remainingTime);
        if (remainingTime <= 0) {
            clearInterval(countdown);
        }
    }, 1000);
});


document.getElementById("reset").addEventListener("click", () => {
    clearInterval(countdown);
    document.getElementById("countdownDisplay").textContent = "Süreyi girin ve başlatın.";
    document.getElementById("timeInput").value = "10";
});