from flask import render_template, redirect, request
from app import app
from forms import LoginForm
from models import User
from flask.ext.login import login_user, logout_user
from app.utils.encode import sha512
from app import lm


@lm.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    if request.method == "POST":
        try:
            # user = User.query.filter_by(email=form.email.data, password=sha512(form.password.data))[-1]
            user = User.query.filter_by(email=form.email.data, password=form.password.data)[-1]
            login_user(user, remember=True)
            redir = request.args.get("next", "/")
            return redirect(redir)
        except:
            return render_template('login.html', form=form)

    return render_template('login.html', form=form)


@app.route('/logout/')
def logout():
    logout_user()
    return redirect('/')


@app.route('/')
def index():
    return render_template('index.html')
