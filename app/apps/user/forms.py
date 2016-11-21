from flask_wtf import Form
from wtforms import TextField, validators, PasswordField


class LoginForm(Form):
    email = TextField('email', validators=[validators.Required(), validators.Email()])
    password = PasswordField('password', validators=[validators.Required()])


class NewUserForm(Form):
    email = TextField('email', validators=[validators.Required(), validators.Email()])
    name = TextField('name', validators=[validators.Required(),
                                                    validators.Length(min=3, max=128,
                                                    message='Name field must be between 3 and 128 characters long.')])
    password = PasswordField('password', validators=[validators.Required(),
                                                        validators.EqualTo('confirm',
                                                        message='Passwords must match')])
