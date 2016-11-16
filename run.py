#!flask/bin/python
from app import app
from flask.ext.runner import Manager

app.debug = True
manager = Manager(app)
manager.run()

