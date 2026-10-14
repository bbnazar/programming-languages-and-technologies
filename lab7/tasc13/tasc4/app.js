const menuItems = [
    { name: "Эспрессо", price: "150 ₽", desc: "Классический крепкий кофе" },
    { name: "Капучино", price: "220 ₽", desc: "Кофе с нежной молочной пенкой" },
    { name: "Круассан", price: "180 ₽", desc: "Свежая французская выпечка" },
    { name: "Чизкейк", price: "250 ₽", desc: "Классический нью-йоркский десерт" }
];

const promos = [
    { title: "Утренний комбо", text: "Кофе + Круассан всего за 290 ₽ до 11:00!" },
    { title: "Счастливые часы", text: "Скидка 20% на все десерты каждый день с 16:00 до 18:00." }
];

const contentContainer = document.querySelector("#content");

function renderMenu() {
    const grid = document.createElement("div");
    grid.className = "grid";
    menuItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        
        const title = document.createElement("h3");
        title.textContent = item.name;
        
        const desc = document.createElement("p");
        desc.textContent = item.desc;
        
        const price = document.createElement("p");
        price.className = "price";
        price.textContent = item.price;
        
        card.append(title, desc, price);
        grid.append(card);
    });
    contentContainer.append(grid);
}

function renderPromo() {
    promos.forEach(promo => {
        const div = document.createElement("div");
        div.className = "promo-banner";
        
        const title = document.createElement("h3");
        title.textContent = promo.title;
        
        const text = document.createElement("p");
        text.textContent = promo.text;
        
        div.append(title, text);
        contentContainer.append(div);
    });
}

function renderAddress() {
    const title = document.createElement("h2");
    title.textContent = "Наши контакты";
    const text = document.createElement("p");
    text.textContent = "Адрес: ул. Программистов, д. 404";
    const hours = document.createElement("p");
    hours.textContent = "Часы работы: ежедневно с 08:00 до 22:00";
    
    contentContainer.append(title, text, hours);
}

function switchPage(pageId) {
    contentContainer.innerHTML = "";
    if (pageId === "menu") renderMenu();
    else if (pageId === "promo") renderPromo();
    else if (pageId === "address") renderAddress();
}

document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll("[data-page]").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        switchPage(e.target.dataset.page);
    });
});

// Инициализация первой страницы
switchPage("menu");
