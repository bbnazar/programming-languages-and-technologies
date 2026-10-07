const questions = [
    {
        question: "Какой тег используется для создания ссылки в HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0
    },
    {
        question: "Какое свойство CSS отвечает за цвет текста?",
        options: ["background-color", "color", "text-style", "font-color"],
        answer: 1
    },
    {
        question: "Какой метод используется для поиска элемента по ID в JavaScript?",
        options: ["querySelector()", "getElementByClass()", "getElementById()", "findElements()"],
        answer: 2
    },
    {
        question: "Что выведет typeof null в JavaScript?",
        options: ["null", "undefined", "object", "number"],
        answer: 2
    },
    {
        question: "Какое событие происходит при клике на элемент мышей?",
        options: ["onhover", "click", "submit", "change"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTitle = document.querySelector('#questionTitle');
const optionsContainer = document.querySelector('#optionsContainer');
const quizContainer = document.querySelector('#quizContainer');
const resultContainer = document.querySelector('#resultContainer');
const resultText = document.querySelector('#resultText');
const restartBtn = document.querySelector('#restartBtn');

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionTitle.textContent = `${currentQuestionIndex + 1}. ${q.question}`;
        optionsContainer.innerHTML = '';

        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.className = 'option-btn';
            btn.addEventListener('click', () => selectAnswer(index));
            optionsContainer.append(btn);
        });
    } else {
        showResult();
    }
}

function selectAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    if (selectedIndex === q.answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultText.textContent = `Вы правильно ответили на ${score} из ${questions.length} вопросов.`;
}

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

// Инициализация при загрузке
loadQuestion();