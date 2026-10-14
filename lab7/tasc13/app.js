const weatherData = {
    "Москва": {
        today: { temp: "+12°C", cond: "Облачно", wind: "4 м/с" },
        week: [
            { day: "Пн", temp: "+11°C" }, { day: "Вт", temp: "+13°C" },
            { day: "Ср", temp: "+12°C" }, { day: "Чт", temp: "+10°C" },
            { day: "Пт", temp: "+9°C" }
        ]
    },
    "Астана": {
        today: { temp: "+5°C", cond: "Ясно, ветрено", wind: "9 м/с" },
        week: [
            { day: "Пн", temp: "+6°C" }, { day: "Вт", temp: "+4°C" },
            { day: "Ср", temp: "+5°C" }, { day: "Чт", temp: "+2°C" },
            { day: "Пт", temp: "0°C" }
        ]
    }
};

let currentCity = "Москва";
const contentContainer = document.querySelector("#content");
const cityLabel = document.querySelector("#current-city-label");

function renderToday() {
    const data = weatherData[currentCity].today;
    const div = document.createElement("div");
    div.className = "weather-today";
    
    const tempDiv = document.createElement("div");
    tempDiv.className = "temp";
    tempDiv.textContent = data.temp;
    
    const condP = document.createElement("p");
    condP.textContent = `Условия: ${data.cond}`;
    
    const windP = document.createElement("p");
    windP.textContent = `Ветер: ${data.wind}`;
    
    div.append(tempDiv, condP, windP);
    contentContainer.append(div);
}

function renderWeek() {
    const list = weatherData[currentCity].week;
    list.forEach(item => {
        const row = document.createElement("div");
        row.className = "day-row";
        
        const daySpan = document.createElement("span");
        daySpan.textContent = item.day;
        
        const tempSpan = document.createElement("span");
        tempSpan.textContent = item.temp;
        
        row.append(daySpan, tempSpan);
        contentContainer.append(row);
    });
}

function renderCities() {
    Object.keys(weatherData).forEach(city => {
        const div = document.createElement("div");
        div.className = "city-option";
        div.textContent = city;
        if(city === currentCity) div.style.fontWeight = "bold";
        
        div.addEventListener("click", () => {
            currentCity = city;
            cityLabel.textContent = city;
            // Переключаемся на вкладку "Сегодня" после выбора города
            document.querySelectorAll("[data-page]").forEach(b => b.classList.remove("active"));
            document.querySelector('[data-page="today"]').classList.add("active");
            switchPage("today");
        });
        contentContainer.append(div);
    });
}

function switchPage(pageId) {
    contentContainer.innerHTML = "";
    if (pageId === "today") renderToday();
    else if (pageId === "week") renderWeek();
    else if (pageId === "cities") renderCities();
}

document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll("[data-page]").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        switchPage(e.target.dataset.page);
    });
});

switchPage("today");
