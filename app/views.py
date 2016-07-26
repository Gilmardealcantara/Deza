from flask import Flask, render_template, flash, redirect, abort, request
from app import app
from forms import LoginForm
from models import User


@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()
    if request.method == "POST":
        pass

    else:
        return render_template('login.html', form=form)




@app.route('/')
def index():
    return render_template('login.html')








    '''
    if form.validate_on_submit():
        # Login and validate the user.
        # user should be an instance of your `User` class
        login_user(user)

        flash('Logged in successfully.')

        next = flask.request.args.get('next')
        # next_is_valid should check if the user has valid
        # permission to access the `next` url
        if not next_is_valid(next):
            return abort(400)

        return redirect(next or flask.url_for('index'))
    '''