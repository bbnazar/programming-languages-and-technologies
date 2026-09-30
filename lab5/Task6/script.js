const numberInput = document.getElementById("number");
const button = document.getElementById("btn");
const numbersOutput = document.getElementById("numbers");
const sumOutput = document.getElementById("sum");

function calculateNumbers(n) {
    let numbers = [];
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        numbers.push(i);
        sum += i;
    }

    return {
        numbers: numbers,
        sum: sum
    };
}

button.addEventListener("click", function () {
    const n = Number(numberInput.value);

    if (n <= 0 || !Number.isInteger(n)) {
        numbersOutput.textContent = "Введите целое число больше 0";
        sumOutput.textContent = "";
        return;
    }

    const result = calculateNumbers(n);

    numbersOutput.textContent = "Числа: " + result.numbers.join(", ");
    sumOutput.textContent = "Сумма: " + result.sum;
});