from flask import Flask
from flask.ext.login import LoginManager
from flask.ext.sqlalchemy import SQLAlchemy
from importlib import import_module


app = Flask(__name__)

app.config.from_object('config')
db = SQLAlchemy(app)

lm = LoginManager()
lm.login_view = "/login"
app.secret_key = 's3cr3t'
lm.init_app(app)


views = import_module('app.apps.general.views')
app.register_blueprint(views.mod)
views = import_module('app.apps.graphs.views')
app.register_blueprint(views.mod)
views = import_module('app.apps.user.views')
app.register_blueprint(views.mod)
