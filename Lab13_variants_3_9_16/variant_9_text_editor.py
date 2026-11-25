# Лабораторная работа №13 — Вариант 9
# Редактор текста: стек изменений, Undo и просмотр текущего текста.

import json
from pathlib import Path

DATA_FILE = Path(__file__).with_name("editor_data.json")


class TextEditor:
    def __init__(self, text=""):
        self.text = text
        self.history = []

    def change_text(self, new_text):
        self.history.append(self.text)
        self.text = new_text
        return "Текст изменен."

    def append_text(self, addition):
        self.history.append(self.text)
        self.text += addition
        return "Текст дополнен."

    def undo(self):
        if not self.history:
            return False, "Нет действий для отмены."
        self.text = self.history.pop()
        return True, "Последнее изменение отменено."

    def get_text(self):
        return self.text

    def save(self):
        data = {"text": self.text, "history": self.history}
        DATA_FILE.write_text(
            json.dumps(data, ensure_ascii=False, indent=4),
            encoding="utf-8"
        )

    def load(self):
        if DATA_FILE.exists():
            try:
                data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
                if isinstance(data, dict):
                    self.text = data.get("text", "")
                    self.history = data.get("history", [])
            except (json.JSONDecodeError, OSError):
                print("Не удалось загрузить сохраненный текст.")


def main():
    editor = TextEditor()
    editor.load()

    while True:
        print("\n=== РЕДАКТОР ТЕКСТА ===")
        print("1. Заменить весь текст")
        print("2. Добавить текст в конец")
        print("3. Отменить последнее изменение (Undo)")
        print("4. Показать текущий текст")
        print("0. Выход")
        choice = input("Выберите действие: ").strip()

        if choice == "1":
            print(editor.change_text(input("Введите новый текст: ")))
            editor.save()
        elif choice == "2":
            addition = input("Введите добавляемый текст: ")
            print(editor.append_text(addition))
            editor.save()
        elif choice == "3":
            ok, message = editor.undo()
            print(message)
            if ok:
                editor.save()
        elif choice == "4":
            print("Текущий текст:")
            print(editor.get_text() if editor.get_text() else "[Текст пуст]")
        elif choice == "0":
            editor.save()
            print("Текст сохранен. До свидания!")
            break
        else:
            print("Неверный пункт меню. Повторите ввод.")


if __name__ == "__main__":
    main()
