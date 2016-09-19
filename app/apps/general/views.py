from app import app
from flask import Blueprint, render_template

mod = Blueprint('general', __name__)

@app.route('/')
def index():
    return render_template('index.html')