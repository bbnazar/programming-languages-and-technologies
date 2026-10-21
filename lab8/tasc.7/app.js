// Словарь переводов
const translations = {
    ru: {
        select: "Выберите язык:",
        title: "Добро пожаловать!",
        text: "Это демонстрационное приложение, которое запоминает ваш выбор языка интерфейса с помощью LocalStorage."
    },
    en: {
        select: "Select language:",
        title: "Welcome!",
        text: "This is a demo application that remembers your choice of interface language using LocalStorage."
    },
    kk: {
        select: "Тілді таңдаңыз:",
        title: "Қош келдіңіз!",
        text: "Бұл LocalStorage көмегімен интерфейс тілін таңдауды есте сақтайтын демонстрациялық қолданба."
    }
};

const STORAGE_KEY = "lab8_lang";
const langSelect = document.getElementById("lang-select");

// Безопасное чтение из localStorage с обработкой ошибок
let currentLang = "ru";
try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Проверяем, существует ли перевод для сохраненного языка
    if (saved && translations[saved]) {
        currentLang = saved;
    }
} catch (e) {
    console.error("Ошибка чтения localStorage:", e);
}

// Функция обновления текстов на странице
function updateInterface(lang) {
    const data = translations[lang] || translations["ru"];
    document.getElementById("label-select").textContent = data.select;
    document.getElementById("content-title").textContent = data.title;
    document.getElementById("content-text").textContent = data.text;
    langSelect.value = lang;
}

// Обработчик смены языка
langSelect.addEventListener("change", (e) => {
    const newLang = e.target.value;
    currentLang = newLang;
    try {
        localStorage.setItem(STORAGE_KEY, newLang);
    } catch (error) {
        console.error("Не удалось сохранить язык:", error);
    }
    updateInterface(currentLang);
});

// Инициализация при первой загрузке
updateInterface(currentLang);
