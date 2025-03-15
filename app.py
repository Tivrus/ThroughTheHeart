from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

TELEGRAM_TOKEN = 'YOUR_BOT_TOKEN'
CHAT_ID = 'YOUR_CHAT_ID'

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    comment = db.Column(db.Text, nullable=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json

    # Создаем запись в БД
    new_application = Application(
        name=data.get('name'),
        surname=data.get('surname'),
        phone=data.get('phone'),
        comment=data.get('comment', '')
    )
    db.session.add(new_application)
    db.session.commit()

    # Формируем сообщение для Telegram
    message = (
        f"НОВАЯ ЗАЯВКА!\n"
        f"ID: {new_application.id}\n"
        f"Имя: {data.get('name', 'Не указано')}\n"
        f"Фамилия: {data.get('surname', 'Не указана')}\n"
        f"Телефон: {data.get('phone', 'Не указан')}\n"
        f"Комментарий: {data.get('comment', 'Нет')}"
    )
    
    # Отправляем в Telegram
    requests.get(
        f'https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage',
        params={'chat_id': CHAT_ID, 'text': message}
    )
    
    return jsonify(success=True)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)