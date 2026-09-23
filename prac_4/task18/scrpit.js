const form = document.getElementById("bookingForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const ticket = document.getElementById("ticket");
const quantity = document.getElementById("quantity");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ticketError = document.getElementById("ticketError");
const quantityError = document.getElementById("quantityError");

const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    // Запрещаем перезагрузку страницы
    event.preventDefault();

    // Очистка предыдущих ошибок
    nameError.textContent = "";
    emailError.textContent = "";
    ticketError.textContent = "";
    quantityError.textContent = "";

    result.style.display = "none";

    let isValid = true;

    // Получаем значения
    const name = fullName.value.trim();
    const emailValue = email.value.trim();
    const ticketPrice = Number(ticket.value);
    const ticketCount = Number(quantity.value);

    // Проверка ФИО
    if (name === "") {
        nameError.textContent = "Введите ФИО.";
        isValid = false;
    }

    // Проверка e-mail
    if (emailValue === "") {
        emailError.textContent = "Введите e-mail.";
        isValid = false;
    } else {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            emailError.textContent =
                "Введите корректный e-mail.";
            isValid = false;
        }
    }

    // Проверка категории билета
    if (ticket.value === "") {
        ticketError.textContent =
            "Выберите категорию билета.";
        isValid = false;
    }

    // Проверка количества
    if (
        !Number.isInteger(ticketCount) ||
        ticketCount < 1 ||
        ticketCount > 10
    ) {
        quantityError.textContent =
            "Количество билетов должно быть от 1 до 10.";
        isValid = false;
    }

    // Если есть ошибки, прекращаем выполнение
    if (!isValid) {
        return;
    }

    // Расчет стоимости билетов
    const ticketsTotal = ticketPrice * ticketCount;

    // Расчет дополнительных опций
    const options =
        document.querySelectorAll(
            'input[name="option"]:checked'
        );

    let optionsTotal = 0;

    options.forEach(function (option) {
        optionsTotal += Number(option.value);
    });

    // Итоговая стоимость
    const total = ticketsTotal + optionsTotal;

    // Название билета
    const ticketName =
        ticket.options[ticket.selectedIndex].text;

    // Вывод результата
    result.innerHTML = `
        <h2>Бронирование успешно!</h2>

        <p>
            <strong>ФИО:</strong>
            ${name}
        </p>

        <p>
            <strong>E-mail:</strong>
            ${emailValue}
        </p>

        <p>
            <strong>Категория:</strong>
            ${ticketName}
        </p>

        <p>
            <strong>Количество билетов:</strong>
            ${ticketCount}
        </p>

        <p>
            <strong>Стоимость билетов:</strong>
            ${ticketsTotal.toLocaleString("ru-RU")} ₸
        </p>

        <p>
            <strong>Дополнительные опции:</strong>
            ${optionsTotal.toLocaleString("ru-RU")} ₸
        </p>

        <div class="total">
            Итоговая стоимость:
            ${total.toLocaleString("ru-RU")} ₸
        </div>
    `;

    result.style.display = "block";
});