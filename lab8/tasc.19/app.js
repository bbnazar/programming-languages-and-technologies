const budgetForm = document.getElementById("budget-form");
const transactionList = document.getElementById("transaction-list");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const editIdInput = document.getElementById("edit-id");

const STORAGE_KEY = "lab8_budget";
let transactions = [];

// Загрузка
try {
    const raw = localStorage.getItem(STORAGE_KEY);
    transactions = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
} catch {
    transactions = [];
}

function saveAndRender() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
        console.error("Сбой локального хранилища", e);
    }
    render();
}

function render() {
    transactionList.replaceChildren();
    
    let incomeSum = 0;
    let expenseSum = 0;

    transactions.forEach(t => {
        if (t.type === "income") incomeSum += t.amount;
        else expenseSum += t.amount;

        const li = document.createElement("li");
        
        const info = document.createElement("div");
        info.innerHTML = `<span class="${t.type === 'income' ? 'income-text' : 'expense-text'}">
            ${t.type === 'income' ? '+' : '-'} ${t.amount} ₸
        </span> — <strong>${t.category}</strong>`;
        
        const actionsBox = document.createElement("div");
        actionsBox.className = "actions";

        // Кнопка Изменить (Редактировать)
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => startEdit(t));

        // Кнопка Удалить
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "del-btn";
        delBtn.addEventListener("click", () => deleteTransaction(t.id));

        actionsBox.append(editBtn, delBtn);
        li.append(info, actionsBox);
        transactionList.appendChild(li);
    });

    // Расчет баланса и вывод сводки
    document.getElementById("total-income").textContent = incomeSum;
    document.getElementById("total-expense").textContent = expenseSum;
    const balance = incomeSum - expenseSum;
    const balEl = document.getElementById("total-balance");
    balEl.textContent = balance;
    balEl.className = balance >= 0 ? "income-text" : "expense-text";
}

// Режим редактирования
function startEdit(transaction) {
    editIdInput.value = transaction.id;
    document.getElementById("type-select").value = transaction.type;
    document.getElementById("category-input").value = transaction.category;
    document.getElementById("amount-input").value = transaction.amount;
    
    submitBtn.textContent = "Сохранить изменения";
    cancelBtn.style.display = "inline-block";
}

function resetForm() {
    editIdInput.value = "";
    budgetForm.reset();
    submitBtn.textContent = "Добавить";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveAndRender();
    if(editIdInput.value === id) resetForm();
}

// Обработка отправки формы (Создание и Обновление)
budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const type = document.getElementById("type-select").value;
    const category = document.getElementById("category-input").value.trim();
    const amount = parseFloat(document.getElementById("amount-input").value);
    const currentId = editIdInput.value;

    if (!category || isNaN(amount) || amount <= 0) return;

    if (currentId) {
        // Редактирование существующей записи
        transactions = transactions.map(t => t.id === currentId ? { ...t, type, category, amount } : t);
    } else {
        // Создание новой записи
        transactions.push({
            id: Date.now().toString(),
            type,
            category,
            amount
        });
    }

    resetForm();
    saveAndRender();
});

render();
