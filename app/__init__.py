from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('config')
db = SQLAlchemy(app)

lm = LoginManager()
lm.login_view = "/login"
app.secret_key = 's3cr3t'
lm.init_app(app)



from app import views