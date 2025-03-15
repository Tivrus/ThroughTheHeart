from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy


server = Flask(__name__)

server.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///db.db"
server.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db=SQLAlchemy(server)


@server.route("/")
def main():
    return render_template("index.html", float=" ", type=" ", rarity=" ",
    name="USP-S | Cortex", wear="Прямо с завода", number_to_unlock="5",
    days_to_unlock="дней", price="100 993.98", picture="../static/USP.png", 
    title="USP-S | Cortex")

@server.route("/marketCart")
def marketCart():
    return render_template("services.html", title="Cart", Ava="<img src="" alt="">")


server.run(debug=True)












