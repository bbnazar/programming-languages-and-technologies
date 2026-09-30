let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check");
const message = document.getElementById("message");
const attemptsOutput = document.getElementById("attempts");

function checkNumber(guess) {
    attempts++;

    if (guess < secretNumber) {
        return "Моё число больше";
    } else if (guess > secretNumber) {
        return "Моё число меньше";
    } else {
        return "Поздравляю! Вы угадали число!";
    }
}

checkButton.addEventListener("click", function () {
    const guess = Number(guessInput.value);

    if (guess < 1 || guess > 100 || !Number.isInteger(guess)) {
        message.textContent = "Введите целое число от 1 до 100";
        return;
    }

    const result = checkNumber(guess);

    message.textContent = result;
    attemptsOutput.textContent = "Попыток: " + attempts;

    if (guess === secretNumber) {
        checkButton.disabled = true;
        guessInput.disabled = true;
    }
});