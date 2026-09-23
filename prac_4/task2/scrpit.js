const form = document.getElementById("feedbackForm");

const nameInput = document.getElementById("name");
const topicSelect = document.getElementById("topic");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const topicError = document.getElementById("topicError");
const messageError = document.getElementById("messageError");

const counter = document.getElementById("counter");
const result = document.getElementById("result");

// Счетчик символов
messageInput.addEventListener("input", function () {
    counter.textContent = messageInput.value.length;
});

// Отправка формы
form.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    topicError.textContent = "";
    messageError.textContent = "";
    result.textContent = "";
    result.className = "";

    const name = nameInput.value.trim();
    const topic = topicSelect.value;
    const message = messageInput.value.trim();

    let isValid = true;

    if (name === "") {
        nameError.textContent = "Введите ваше имя.";
        isValid = false;
    }

    if (topic === "") {
        topicError.textContent = "Выберите тему сообщения.";
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "Введите текст сообщения.";
        isValid = false;
    }

    if (isValid) {
        result.textContent = "Сообщение успешно отправлено!";
        result.className = "success";

        form.reset();
        counter.textContent = "0";
    }
});