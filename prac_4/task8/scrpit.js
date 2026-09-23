const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");

const productError = document.getElementById("productError");
const quantityError = document.getElementById("quantityError");
const deliveryError = document.getElementById("deliveryError");

const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Очистка старых ошибок
    productError.textContent = "";
    quantityError.textContent = "";
    deliveryError.textContent = "";

    result.style.display = "none";

    let isValid = true;

    // Проверка товара
    if (product.value === "") {
        productError.textContent = "Выберите товар.";
        isValid = false;
    }

    // Проверка количества
    const count = Number(quantity.value);

    if (count <= 0 || !Number.isInteger(count)) {
        quantityError.textContent =
            "Количество должно быть целым числом больше 0.";
        isValid = false;
    }

    // Проверка доставки
    const delivery = document.querySelector(
        'input[name="delivery"]:checked'
    );

    if (!delivery) {
        deliveryError.textContent =
            "Выберите способ доставки.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Цена товара
    const productPrice = Number(product.value);

    // Стоимость доставки
    const deliveryPrice = Number(delivery.value);

    // Стоимость дополнительных услуг
    const services = document.querySelectorAll(
        'input[name="service"]:checked'
    );

    let servicesPrice = 0;

    services.forEach(function (service) {
        servicesPrice += Number(service.value);
    });

    // Итоговая стоимость
    const total =
        productPrice * count +
        deliveryPrice +
        servicesPrice;

    // Название выбранного товара
    const productName =
        product.options[product.selectedIndex].text;

    // Название доставки
    const deliveryName =
        delivery.parentElement.textContent.trim();

    result.innerHTML = `
        <h2>Заказ оформлен</h2>
        <p><strong>Товар:</strong> ${productName}</p>
        <p><strong>Количество:</strong> ${count}</p>
        <p><strong>Доставка:</strong> ${deliveryName}</p>
        <p class="price">Итого: ${total.toLocaleString("ru-RU")} ₸</p>
    `;

    result.style.display = "block";
});