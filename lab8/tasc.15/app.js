const movieForm = document.getElementById("movie-form");
const movieList = document.getElementById("movie-list");
const filterGenre = document.getElementById("filter-genre");

const STORAGE_KEY = "lab8_movies";
let movies = [];

// Безопасная загрузка из localStorage
try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(rawData || "[]");
    movies = Array.isArray(parsed) ? parsed : [];
} catch (e) {
    console.error("Ошибка восстановления JSON:", e);
    movies = [];
}

// Сохранение структуры данных
function saveMovies() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (e) {
        console.error("Не удалось сохранить данные:", e);
    }
    render();
}

// Удаление фильма
function deleteMovie(id) {
    movies = movies.filter(movie => movie.id !== id);
    saveMovies();
}

// Отрисовка списка с учетом фильтра
function render() {
    movieList.replaceChildren();
    
    const filterText = filterGenre.value.trim().toLowerCase();
    
    movies.forEach(movie => {
        // Проверка фильтра по жанру
        if (filterText && !movie.genre.toLowerCase().includes(filterText)) {
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${movie.title}</strong> — 
                <span>Жанр: ${movie.genre}</span> | 
                <span>Рейтинг: ⭐${movie.rating}</span>
            </div>
        `;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Удалить";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", () => deleteMovie(movie.id));

        li.appendChild(delBtn);
        movieList.appendChild(li);
    });
}

// Добавление нового фильма
movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title-input").value.trim();
    const genre = document.getElementById("genre-input").value.trim();
    const rating = parseFloat(document.getElementById("rating-input").value);

    if (!title || !genre || isNaN(rating)) return;

    const newMovie = {
        id: Date.now().toString(), // Уникальный ID
        title,
        genre,
        rating
    };

    movies.push(newMovie);
    movieForm.reset();
    saveMovies();
});

// Слушатель для фильтрации в реальном времени
filterGenre.addEventListener("input", render);

// Первый запуск приложения
render();
