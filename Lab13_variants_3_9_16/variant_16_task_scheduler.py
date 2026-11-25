# Лабораторная работа №13 — Вариант 16
# Планировщик задач: срочная и обычная очереди, FIFO внутри каждого уровня.

from collections import deque
import json
from pathlib import Path

DATA_FILE = Path(__file__).with_name("tasks_data.json")


class TaskScheduler:
    def __init__(self):
        self.urgent_queue = deque()
        self.normal_queue = deque()
        self.completed = []

    def add_task(self, name, urgent=False):
        name = name.strip()
        if not name:
            return False, "Название задачи не может быть пустым."
        task = {"name": name, "priority": "срочная" if urgent else "обычная"}
        target = self.urgent_queue if urgent else self.normal_queue
        target.append(task)
        return True, f'Задача «{name}» добавлена в {task["priority"]} очередь.'

    def process_next(self):
        if self.urgent_queue:
            task = self.urgent_queue.popleft()
        elif self.normal_queue:
            task = self.normal_queue.popleft()
        else:
            return None
        self.completed.append(task)
        return task

    def show_queues(self):
        return list(self.urgent_queue), list(self.normal_queue)

    def save(self):
        data = {
            "urgent": list(self.urgent_queue),
            "normal": list(self.normal_queue),
            "completed": self.completed
        }
        DATA_FILE.write_text(
            json.dumps(data, ensure_ascii=False, indent=4),
            encoding="utf-8"
        )

    def load(self):
        if DATA_FILE.exists():
            try:
                data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
                self.urgent_queue = deque(data.get("urgent", []))
                self.normal_queue = deque(data.get("normal", []))
                self.completed = data.get("completed", [])
            except (json.JSONDecodeError, OSError, TypeError):
                print("Не удалось загрузить задачи. Созданы пустые очереди.")


def main():
    scheduler = TaskScheduler()
    scheduler.load()

    while True:
        print("\n=== ПЛАНИРОВЩИК ЗАДАЧ ===")
        print("1. Добавить обычную задачу")
        print("2. Добавить срочную задачу")
        print("3. Обслужить следующую задачу")
        print("4. Показать очереди")
        print("5. Показать выполненные задачи")
        print("0. Выход")
        choice = input("Выберите действие: ").strip()

        if choice == "1":
            ok, message = scheduler.add_task(input("Название задачи: "), urgent=False)
            print(message)
            if ok:
                scheduler.save()
        elif choice == "2":
            ok, message = scheduler.add_task(input("Название задачи: "), urgent=True)
            print(message)
            if ok:
                scheduler.save()
        elif choice == "3":
            task = scheduler.process_next()
            if task is None:
                print("Очереди пусты. Нет задач для обслуживания.")
            else:
                print(f'Выполнена {task["priority"]} задача: {task["name"]}')
                scheduler.save()
        elif choice == "4":
            urgent, normal = scheduler.show_queues()
            print("Срочная очередь:")
            if urgent:
                for i, task in enumerate(urgent, 1):
                    print(f'{i}. {task["name"]}')
            else:
                print("  пуста")
            print("Обычная очередь:")
            if normal:
                for i, task in enumerate(normal, 1):
                    print(f'{i}. {task["name"]}')
            else:
                print("  пуста")
        elif choice == "5":
            if not scheduler.completed:
                print("Выполненных задач пока нет.")
            else:
                for i, task in enumerate(scheduler.completed, 1):
                    print(f'{i}. [{task["priority"]}] {task["name"]}')
        elif choice == "0":
            scheduler.save()
            print("Данные сохранены. До свидания!")
            break
        else:
            print("Неверный пункт меню. Повторите ввод.")


if __name__ == "__main__":
    main()
