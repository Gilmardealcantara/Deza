from flask import render_template, redirect, request
from app import app
from forms import LoginForm
from models import User
from flask.ext.login import login_user
from app.utils.encode import sha512


@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        if request.method == "POST":

            import pdb; pdb.set_trace()

            try:
                user = User.query.filter_by(
                    email=form.email.data,
                    password=sha512(form.password.data)
                )[-1]
                login_user(user, remember=True)
                redir = request.args.get("next", "/")
                return redirect(redir)
            except:
                return render_template('login.html', form=form)
        else:
            return render_template('login.html', form=form)

    return render_template('login.html', form=form)


@app.route('/')
def index():
    return render_template('login.html')
