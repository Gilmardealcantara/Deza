from flask import Flask
from flask.ext.login import LoginManager

app = Flask(__name__)

from app import views

lm = LoginManager()
lm.login_view = "/login"
lm.init_app(app)
