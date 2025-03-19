from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

server = Flask(__name__)

# Настройки базы данных
server.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
server.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Настройки Flask-Mail
server.config['MAIL_SERVER'] = 'smtp.gmail.com'
server.config['MAIL_PORT'] = 465
server.config['MAIL_USE_SSL'] = True
server.config['MAIL_USERNAME'] = 'your_email@gmail.com'  # Замените на вашу почту
server.config['MAIL_PASSWORD'] = 'your_password'  # Замените на ваш пароль или пароль приложения
server.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'  # Замените на вашу почту

db = SQLAlchemy(server)
mail = Mail(server)

@server.route("/main")
def main():
    return render_template("index.html", title="Пирсинг Салон | Through the heart", Ava="../static/images/logo.png")

@server.route("/services")
def services():
    return render_template("services.html", title="Cart", Ava="<img src='' alt=''>")

# Маршрут для обработки формы
@server.route("/submit_form", methods=["POST"])
def submit_form():
    if request.method == "POST":
        # Получаем данные из формы
        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        service = request.form.get("service")
        date = request.form.get("date")

        # Формируем текст письма
        msg = Message(
            subject="Новая заявка с сайта",
            recipients=["tivruspod4@gmail.com"]  # Ваша почта
        )
        msg.body = f"""
        Новая заявка:
        Имя: {name}
        Email: {email}
        Телефон: {phone}
        Услуга: {service}
        Дата: {date}
        """

        # Отправляем письмо
        try:
            mail.send(msg)
            flash("Заявка успешно отправлена!", "success")
        except Exception as e:
            flash(f"Ошибка при отправке заявки: {str(e)}", "danger")

        return redirect(url_for("services"))

if __name__ == "__main__":
    server.run(debug=True)