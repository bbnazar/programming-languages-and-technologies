# Лабораторная работа №13 — Вариант 3
# Каталог книг: добавление, поиск по подстроке без учета регистра, удаление.

import json
from pathlib import Path

DATA_FILE = Path(__file__).with_name("books.json")


class BookCatalog:
    def __init__(self):
        self.books = []

    def add_book(self, title):
        title = title.strip()
        if not title:
            return False, "Название книги не может быть пустым."
        if any(book.casefold() == title.casefold() for book in self.books):
            return False, "Такая книга уже есть в каталоге."
        self.books.append(title)
        return True, f'Книга «{title}» добавлена.'

    def search_books(self, query):
        query = query.strip().casefold()
        if not query:
            return []
        return [book for book in self.books if query in book.casefold()]

    def remove_book(self, title):
        title = title.strip()
        for book in self.books:
            if book.casefold() == title.casefold():
                self.books.remove(book)
                return True, f'Книга «{book}» удалена.'
        return False, "Книга не найдена."

    def show_books(self):
        return self.books.copy()

    def save(self):
        DATA_FILE.write_text(
            json.dumps(self.books, ensure_ascii=False, indent=4),
            encoding="utf-8"
        )

    def load(self):
        if DATA_FILE.exists():
            try:
                data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
                if isinstance(data, list) and all(isinstance(x, str) for x in data):
                    self.books = data
            except (json.JSONDecodeError, OSError):
                print("Не удалось прочитать файл. Начат пустой каталог.")


def main():
    catalog = BookCatalog()
    catalog.load()

    while True:
        print("\n=== КАТАЛОГ КНИГ ===")
        print("1. Добавить книгу")
        print("2. Поиск книги")
        print("3. Удалить книгу")
        print("4. Показать все книги")
        print("0. Выход")
        choice = input("Выберите действие: ").strip()

        if choice == "1":
            ok, message = catalog.add_book(input("Название книги: "))
            print(message)
            if ok:
                catalog.save()
        elif choice == "2":
            result = catalog.search_books(input("Введите часть названия: "))
            print("Найдено:" if result else "Ничего не найдено.")
            for number, book in enumerate(result, 1):
                print(f"{number}. {book}")
        elif choice == "3":
            ok, message = catalog.remove_book(input("Название книги: "))
            print(message)
            if ok:
                catalog.save()
        elif choice == "4":
            books = catalog.show_books()
            if not books:
                print("Каталог пуст.")
            else:
                for number, book in enumerate(books, 1):
                    print(f"{number}. {book}")
        elif choice == "0":
            catalog.save()
            print("Данные сохранены. До свидания!")
            break
        else:
            print("Неверный пункт меню. Повторите ввод.")


if __name__ == "__main__":
    main()
