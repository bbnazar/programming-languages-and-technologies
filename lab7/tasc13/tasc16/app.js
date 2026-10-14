// Исходная база данных в памяти
const journal = [
    { id: 1, name: "Иван Иванов", grades: [5, 4, 5] },
    { id: 2, name: "Анна Петрова", grades: [4, 3, 5] }
];

const contentContainer = document.querySelector("#content");

function renderStudents() {
    const title = document.createElement("h2");
    title.textContent = "Список студентов";
    
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.placeholder = "ФИО нового студента";
    input.required = true;
    
    const btn = document.createElement("button");
    btn.textContent = "Добавить";
    form.append(input, btn);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newId = journal.length ? Math.max(...journal.map(s => s.id)) + 1 : 1;
        journal.push({ id: newId, name: input.value.trim(), grades: [] });
        switchPage("students");
    });

    const ul = document.createElement("document-fragment");
    const listElement = document.createElement("ul");
    
    journal.forEach(student => {
        const li = document.createElement("li");
        li.textContent = student.name;
        listElement.append(li);
    });
    
    contentContainer.append(title, form, listElement);
}

function renderGrades() {
    const title = document.createElement("h2");
    title.textContent = "Выставление оценок";
    
    const form = document.createElement("form");
    const select = document.createElement("select");
    
    journal.forEach(student => {
        const opt = document.createElement("option");
        opt.value = student.id;
        opt.textContent = student.name;
        select.append(opt);
    });
    
    const selectGrade = document.createElement("select");
    [2, 3, 4, 5].forEach(g => {
        const opt = document.createElement("option");
        opt.value = g;
        opt.textContent = g;
        selectGrade.append(opt);
    });
    
    const btn = document.createElement("button");
    btn.textContent = "Поставить";
    form.append(select, selectGrade, btn);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const studentId = parseInt(select.value);
        const grade = parseInt(selectGrade.value);
        const student = journal.find(s => s.id === studentId);
        if (student) {
            student.grades.push(grade);
        }
        switchPage("grades");
    });
    
    const ul = document.createElement("ul");
    journal.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name}: ${student.grades.length ? student.grades.join(", ") : "нет оценок"}`;
        ul.append(li);
    });
    
    contentContainer.append(title, form, ul);
}

function renderStats() {
    const title = document.createElement("h2");
    title.textContent = "Статистика успеваемости";
    
    let allGrades = [];
    const ul = document.createElement("ul");
    
    journal.forEach(student => {
        const li = document.createElement("li");
        let avg = 0;
        if(student.grades.length) {
            const sum = student.grades.reduce((a, b) => a + b, 0);
            avg = (sum / student.grades.length).toFixed(2);
            allGrades.push(...student.grades);
        }
        li.textContent = `${student.name} — Средний балл: ${avg || "N/A"}`;
        ul.append(li);
    });
    
    const totalDiv = document.createElement("div");
    totalDiv.className = "stat-box";
    if(allGrades.length) {
        const totalSum = allGrades.reduce((a, b) => a + b, 0);
        totalDiv.textContent = `Общий средний балл группы: ${(totalSum / allGrades.length).toFixed(2)}`;
    } else {
        totalDiv.textContent = "Общий средний балл группы: нет данных";
    }
    
    contentContainer.append(title, ul, totalDiv);
}

function switchPage(pageId) {
    contentContainer.innerHTML = "";
    if (pageId === "students") renderStudents();
    else if (pageId === "grades") renderGrades();
    else if (pageId === "stats") renderStats();
}

document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll("[data-page]").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        switchPage(e.target.dataset.page);
    });
});

switchPage("students");
