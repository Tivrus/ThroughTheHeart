from flask import Flask, render_template, request, jsonify
import json
import os
import threading
import telebot

# Настройка Flask-приложения
server = Flask(__name__)

# Путь к JSON-файлу для хранения данных
DATA_FILE = "submissions.json"
# Путь к файлу для хранения ID сообщений
MESSAGES_IDS_FILE = "message_ids.json"

def save_to_json(data):
    """
    Сохраняет данные в JSON-файл.
    """
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            try:
                submissions = json.load(file)
            except json.JSONDecodeError:
                submissions = []
    else:
        submissions = []

    submissions.append(data)

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(submissions, file, ensure_ascii=False, indent=4)


@server.route("/main")
def main():
    return render_template("index.html", title="Пирсинг Салон | Through the heart", Ava="../static/images/logo.png")


@server.route("/services")
def services():
    return render_template("services.html", title="Cart", Ava="<img src='' alt=''>")


@server.route("/submit_form", methods=["POST"])
def submit_form():
    """
    Обрабатывает отправку формы и сохраняет данные в JSON-файл.
    """
    name = request.form.get("name")
    surname = request.form.get("surname")
    phone = request.form.get("phone")
    comment = request.form.get("comment")

    if not all([name, surname, phone]):
        return jsonify({"status": "error", "message": "Все поля обязательны для заполнения."})

    submission_data = {
        "name": name,
        "surname": surname,
        "phone": phone,
        "comment": comment,
    }

    save_to_json(submission_data)

    return jsonify({"status": "success", "message": "Заявка успешно сохранена!"})


# Настройка Telegram-бота
BOT_TOKEN = "7920844201:AAECMrQS3Iq8fpAg26qtnKJlFC5PGcMGnYw"
bot = telebot.TeleBot(BOT_TOKEN)


def read_json(file_path):
    """
    Читает данные из JSON-файла.
    """
    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        return []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
            return data
    except Exception as e:
        print(f"Ошибка при чтении данных: {e}")
        return []


def save_message_ids(message_ids):
    """
    Сохраняет ID сообщений в JSON-файл.
    """
    with open(MESSAGES_IDS_FILE, "w", encoding="utf-8") as file:
        json.dump(message_ids, file, ensure_ascii=False, indent=4)


def delete_previous_messages(chat_id):
    """
    Удаляет все предыдущие сообщения бота в чате.
    """
    message_ids = read_json(MESSAGES_IDS_FILE)

    for message_id in message_ids:
        try:
            bot.delete_message(chat_id=chat_id, message_id=message_id)
        except Exception as e:
            print(f"Ошибка при удалении сообщения с ID {message_id}: {e}")

    # Очищаем файл с ID сообщений
    save_message_ids([])


@bot.message_handler(commands=["start"])
def send_welcome(message):
    """
    Обработчик команды /start.
    """
    chat_id = message.chat.id

    # Удаляем предыдущие сообщения
    delete_previous_messages(chat_id)

    # Читаем данные из JSON-файла
    data = read_json(DATA_FILE)

    if not data:
        response = "Нет сохраненных заявок."
        sent_message = bot.send_message(chat_id, response)
        save_message_ids([sent_message.message_id])
        return

    # Отправляем каждую заявку отдельным сообщением
    message_ids = []
    for idx, submission in enumerate(data, start=1):
        response = f"📝 Заявка #{idx}:\n"
        response += f"👤 Имя: {submission.get('name', 'Не указано')}\n"
        response += f"📛 Фамилия: {submission.get('surname', 'Не указано')}\n"
        response += f"📞 Телефон: {submission.get('phone', 'Не указано')}\n"
        response += f"💬 Комментарий: {submission.get('comment', 'Нет комментария')}\n"
        sent_message = bot.send_message(chat_id, response)
        message_ids.append(sent_message.message_id)

    # Сохраняем ID отправленных сообщений
    save_message_ids(message_ids)


def run_telegram_bot():
    """
    Запускает Telegram-бота в отдельном потоке.
    """
    print("Запуск Telegram-бота...")
    bot.polling(none_stop=True)


if __name__ == "__main__":
    # Запускаем Telegram-бота в отдельном потоке
    telegram_thread = threading.Thread(target=run_telegram_bot)
    telegram_thread.daemon = True  # Поток завершится при завершении основного приложения
    telegram_thread.start()

    # Запускаем Flask-сервер
    print("Запуск Flask-сервера...")
    server.run(debug=True)